const { test, expect } = require('@playwright/test');

// Restful Booker is a public practice API. These tests run in order:
// they create a booking, then read, update and delete that same booking.
test.describe.configure({ mode: 'serial' });

const booking = {
  firstname: 'Ayesha',
  lastname: 'Tester',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
};

let token;
let bookingId;

test('health check responds', async ({ request }) => {
  const res = await request.get('/ping');
  expect(res.status()).toBe(201); // API returns 201 for /ping by design
});

test('auth: valid credentials return a token', async ({ request }) => {
  const res = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.token).toBeTruthy();
  token = body.token;
});

test('auth: invalid credentials return no token', async ({ request }) => {
  const res = await request.post('/auth', {
    data: { username: 'admin', password: 'wrong' },
  });
  // Known defect API-BUG-003: returns 200 instead of 401.
  const body = await res.json();
  expect(body.token).toBeUndefined();
  expect(body.reason).toBe('Bad credentials');
});

test('create booking', async ({ request }) => {
  const res = await request.post('/booking', { data: booking });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(typeof body.bookingid).toBe('number');
  expect(body.booking).toEqual(booking);
  bookingId = body.bookingid;
});

test('get booking by id returns the saved data', async ({ request }) => {
  const res = await request.get(`/booking/${bookingId}`);
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual(booking);
});

test('update without a token is rejected', async ({ request }) => {
  const res = await request.put(`/booking/${bookingId}`, {
    data: { ...booking, firstname: 'Hacker' },
  });
  expect(res.status()).toBe(403);
});

test('full update with a token', async ({ request }) => {
  const updated = { ...booking, totalprice: 200, additionalneeds: 'Late checkout' };
  const res = await request.put(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
    data: updated,
  });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual(updated);
});

test('partial update changes only the sent field', async ({ request }) => {
  const res = await request.patch(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
    data: { firstname: 'Sara' },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.firstname).toBe('Sara');
  expect(body.lastname).toBe(booking.lastname);
});

test('delete booking, then it is gone', async ({ request }) => {
  const del = await request.delete(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
  });
  // Known defect API-BUG-001: returns 201 Created instead of 200/204.
  expect([200, 201, 204]).toContain(del.status());

  const get = await request.get(`/booking/${bookingId}`);
  expect(get.status()).toBe(404);
});

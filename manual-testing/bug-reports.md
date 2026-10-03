# Bug Reports: SauceDemo

SauceDemo includes special accounts with intentional defects. The reports below show how I document issues so developers can reproduce and fix them quickly.

**Environment for all reports:** Chrome (latest), Windows 11 · Public build, October 2026

---

## BUG-001: All products show the same image for `problem_user`

| Severity | Priority | Area | Account |
|---|---|---|---|
| Medium | High | Product list | `problem_user` |

**Steps to reproduce**
1. Go to the login page.
2. Log in as `problem_user` / `secret_sauce`.
3. Look at the product images.

**Expected:** Each product shows its own photo.
**Actual:** Every product shows the same unrelated image.
**Impact:** Shoppers can't see what they're buying; likely to reduce sales and trust.
**Evidence:** Screenshot of product grid.

---

## BUG-002: Sort dropdown doesn't change product order for `problem_user`

| Severity | Priority | Area | Account |
|---|---|---|---|
| Medium | Medium | Sorting | `problem_user` |

**Steps to reproduce**
1. Log in as `problem_user`.
2. Select "Price (low to high)" in the sort dropdown.

**Expected:** Products re-order by price, lowest first.
**Actual:** Product order doesn't change.
**Impact:** Users can't find cheaper items quickly.
**Evidence:** Screen recording.

---

## BUG-003: Checkout last name field doesn't accept input for `problem_user`

| Severity | Priority | Area | Account |
|---|---|---|---|
| High | High | Checkout | `problem_user` |

**Steps to reproduce**
1. Log in as `problem_user` and add any item to the cart.
2. Open the cart and click Checkout.
3. Type a first name, then type a last name.
4. Click Continue.

**Expected:** Both names are saved and the user moves to the overview page.
**Actual:** The last name field doesn't keep the typed value, and "Last Name is required" is shown.
**Impact:** Blocks checkout completely for affected users. **This is a purchase blocker.**
**Evidence:** Screen recording.

---

## BUG-004: Finish button doesn't complete the order for `error_user`

| Severity | Priority | Area | Account |
|---|---|---|---|
| Critical | High | Checkout | `error_user` |

**Steps to reproduce**
1. Log in as `error_user` and add an item to the cart.
2. Complete checkout details and go to the overview page.
3. Click Finish.

**Expected:** Confirmation page "Thank you for your order!" is shown.
**Actual:** Nothing happens; the order isn't completed and no error is shown to the user.
**Impact:** Lost order with no feedback to the shopper.
**Evidence:** Screen recording and browser console log.

---

# Bug Reports: Restful Booker API

**Environment:** `https://restful-booker.herokuapp.com` · Tested with Postman and Playwright

## API-BUG-001: DELETE returns 201 Created instead of 200 or 204

| Severity | Priority | Endpoint |
|---|---|---|
| Low | Low | `DELETE /booking/{id}` |

**Steps:** Authenticate, create a booking, then send `DELETE /booking/{id}` with the token cookie.
**Expected:** `200 OK` or `204 No Content`.
**Actual:** `201 Created`.
**Impact:** Misleading for API consumers; client code that checks for 200/204 will treat a successful delete as a failure.

## API-BUG-002: Missing required fields return 500 instead of 400

| Severity | Priority | Endpoint |
|---|---|---|
| Medium | Medium | `POST /booking` |

**Steps:** Send `POST /booking` with only `{"firstname": "Test"}`.
**Expected:** `400 Bad Request` with a message naming the missing fields.
**Actual:** `500 Internal Server Error`.
**Impact:** Validation errors look like server crashes, so clients can't tell users what to fix, and monitoring raises false alarms.

## API-BUG-003: Wrong credentials return 200 OK

| Severity | Priority | Endpoint |
|---|---|---|
| Low | Medium | `POST /auth` |

**Steps:** Send `POST /auth` with a wrong password.
**Expected:** `401 Unauthorized`.
**Actual:** `200 OK` with body `{"reason": "Bad credentials"}`.
**Impact:** Clients must parse the body to detect a failed login instead of relying on the status code.

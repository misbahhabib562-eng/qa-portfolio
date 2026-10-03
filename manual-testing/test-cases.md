# Test Cases: SauceDemo

**Environment:** Chrome (latest), Windows 11 · **Account:** `standard_user` unless stated
**Result key:** ✅ Pass · ❌ Fail · ⛔ Blocked

## Login

| ID | Title | Steps | Expected result | Type | Result |
|---|---|---|---|---|---|
| TC-01 | Valid login | Enter `standard_user` / `secret_sauce`, click Login | Products page opens | Functional | ✅ |
| TC-02 | Locked-out user | Log in as `locked_out_user` | Error: user has been locked out | Negative | ✅ |
| TC-03 | Wrong password | Valid username, wrong password | Generic error, no hint which field is wrong | Negative | ✅ |
| TC-04 | Empty username | Leave username empty, click Login | "Username is required" | Negative | ✅ |
| TC-05 | Empty password | Leave password empty, click Login | "Password is required" | Negative | ✅ |
| TC-06 | Direct URL without login | Open `/inventory.html` while logged out | Redirected to login with an error | Security | ✅ |
| TC-07 | Logout | Menu → Logout, then press browser Back | Login page shown; products not accessible | Functional | ✅ |

## Products

| ID | Title | Steps | Expected result | Type | Result |
|---|---|---|---|---|---|
| TC-08 | Product list | Log in | 6 products, each with image, name, price and button | Functional | ✅ |
| TC-09 | Sort price low → high | Select "Price (low to high)" | Prices in ascending order | Functional | ✅ |
| TC-10 | Sort name Z → A | Select "Name (Z to A)" | Names in reverse alphabetical order | Functional | ✅ |
| TC-11 | Product details | Click a product name | Details page shows the same product and price | Functional | ✅ |
| TC-12 | Images match products (`problem_user`) | Log in as `problem_user` | Each product shows its own image | Functional | ❌ BUG-001 |
| TC-13 | Sorting (`problem_user`) | Log in as `problem_user`, change sort | List re-orders | Functional | ❌ BUG-002 |

## Cart

| ID | Title | Steps | Expected result | Type | Result |
|---|---|---|---|---|---|
| TC-14 | Add item | Click "Add to cart" on one item | Badge shows 1, button changes to "Remove" | Functional | ✅ |
| TC-15 | Remove item | Click "Remove" | Badge disappears | Functional | ✅ |
| TC-16 | Cart persists | Add item, reload page | Item still in cart | Edge | ✅ |
| TC-17 | Rapid double click | Double-click "Add to cart" quickly | Item added once, state consistent | Edge | ✅ |

## Checkout

| ID | Title | Steps | Expected result | Type | Result |
|---|---|---|---|---|---|
| TC-18 | Complete purchase | Add 2 items → Checkout → fill details → Finish | "Thank you for your order!", cart empty | Functional | ✅ |
| TC-19 | Item total | On overview, compare total with product prices | Item total equals sum of item prices | Functional | ✅ |
| TC-20 | Missing first name | Leave first name empty | "First Name is required", stays on page | Negative | ✅ |
| TC-21 | Missing last name | Leave last name empty | "Last Name is required" | Negative | ✅ |
| TC-22 | Missing postal code | Leave postal code empty | "Postal Code is required" | Negative | ✅ |
| TC-23 | Last name input (`problem_user`) | Log in as `problem_user`, type a last name | Last name accepted | Functional | ❌ BUG-003 |
| TC-24 | Finish order (`error_user`) | Log in as `error_user`, complete checkout | Order completes | Functional | ❌ BUG-004 |

## Responsive

| ID | Title | Steps | Expected result | Type | Result |
|---|---|---|---|---|---|
| TC-25 | Mobile layout | Open on a 390 px wide screen | No horizontal scroll; buttons easy to tap | UI | ✅ |
| TC-26 | Mobile checkout | Complete TC-18 on a phone | Flow works; keyboard doesn't hide fields | UI | ✅ |

**Summary:** 26 executed · 22 passed · 4 failed (all on special demo accounts) · 0 blocked

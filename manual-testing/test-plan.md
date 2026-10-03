# Test Plan: SauceDemo Web Store

| | |
|---|---|
| **Application** | [SauceDemo](https://www.saucedemo.com), a public demo e-commerce site |
| **Version / build** | Public build as of October 2026 |
| **Prepared by** | Misbah H., QA Engineer |
| **Status** | Executed |

## 1. Objective
Confirm that a shopper can log in, browse and sort products, manage a cart and complete checkout, and that errors are handled clearly. Identify functional defects and usability problems, and report them in a format developers can reproduce.

## 2. Scope

**In scope**
- Login and logout, including locked and invalid accounts
- Product listing, sorting and product details
- Cart: add, remove, persistence across reloads
- Checkout: customer details, validation, order summary, order completion
- Responsive layout on desktop and mobile
- Behaviour with the special demo accounts (`problem_user`, `error_user`, `performance_glitch_user`)

**Out of scope**
- Real payment processing (the site has none)
- Security and penetration testing
- Load testing of this site (it's a shared public demo)

## 3. Approach

| Type | How |
|---|---|
| Functional | Manual test cases in [test-cases.md](test-cases.md), then automated in Playwright |
| Negative / edge | Empty fields, wrong credentials, double clicks, reloads mid-flow |
| Exploratory | 30-minute time-boxed sessions per area, notes kept for each session |
| Cross-browser | Chrome, Firefox, Safari, Edge (latest) |
| Mobile | iPhone (iOS 26), Pixel 6 (Android 16), and Chrome device emulation |
| Regression | Automated Playwright suite runs on every push via GitHub Actions |

## 4. Risks and priorities
Highest priority goes to flows that block a purchase or show the wrong price:
1. Login (blocks everything)
2. Checkout and item total (money)
3. Cart accuracy
4. Sorting and product display

## 5. Entry and exit criteria
- **Entry:** site reachable, test accounts available, test cases reviewed.
- **Exit:** all high-priority cases executed; no open Critical or High defects on the standard user journey; all defects logged with evidence.

## 6. Deliverables
- [Test cases](test-cases.md) with results
- [Bug reports](bug-reports.md)
- Automated UI and API tests in [`/tests`](../tests)
- Playwright HTML report from CI

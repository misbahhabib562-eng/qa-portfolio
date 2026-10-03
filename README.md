# QA Portfolio: Manual, API, Automation & Performance Testing

![QA tests](https://github.com/misbahhabib562-eng/qa-portfolio/actions/workflows/tests.yml/badge.svg)

Hi, I'm **Misbah**, a Senior QA Engineer (ISTQB CTFL) with 6+ years of experience testing web, mobile and API products, including a consumer platform with 1M+ active users.

This repository shows how I work, end to end, on two public practice applications:

- **[SauceDemo](https://www.saucedemo.com)**: a demo web store (UI testing)
- **[Restful Booker](https://restful-booker.herokuapp.com)**: a demo booking API (API and performance testing)

## What's inside

| Folder | What it shows | Tools |
|---|---|---|
| [`manual-testing/`](manual-testing) | Test plan, 26 test cases with results, 7 bug reports | Manual, exploratory |
| [`tests/ui/`](tests/ui) | Login, product, cart and checkout automation with the Page Object Model; desktop and mobile | Playwright (JavaScript) |
| [`tests/api/`](tests/api) | Auth, create, read, update, partial update, delete and negative API tests | Playwright API testing |
| [`postman/`](postman) | The same API suite as a Postman collection with test scripts | Postman, Newman |
| [`jmeter/`](jmeter) | Light load test with assertions and an HTML report | Apache JMeter |
| [`.github/workflows/`](.github/workflows) | All suites run automatically on every push | GitHub Actions |

## Highlights

- **Page Object Model** keeps selectors in one place, so tests stay readable and easy to maintain.
- **Data-driven tests** cover several negative cases from one test definition.
- **Real checks, not just clicks:** the checkout test verifies that the item total equals the sum of the product prices.
- **Mobile coverage:** smoke tests also run on an emulated Pixel 7.
- **Defects found and documented:** 4 UI bugs and 3 API bugs, each with steps, expected vs. actual results, severity and impact. See [bug-reports.md](manual-testing/bug-reports.md).
- **Evidence on failure:** screenshots, videos and traces are saved automatically when a test fails.

## Run it yourself

```bash
npm install
npx playwright install chromium

npm test              # all Playwright tests
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run report        # open the HTML report

npm run test:postman  # Postman collection via Newman
```

For JMeter, see [`jmeter/README.md`](jmeter/README.md).

## Project structure

```
├── manual-testing/      test plan, test cases, bug reports
├── pages/               page objects (Login, Inventory, Cart, Checkout)
├── test-data/           test accounts and customer data
├── tests/
│   ├── ui/              Playwright UI tests
│   └── api/             Playwright API tests
├── postman/             Postman collection
├── jmeter/              JMeter load test plan
└── playwright.config.js
```

## About me

- 6+ years in QA across web, iOS, Android, kiosk and API testing
- ISTQB Certified Tester (Foundation Level) · Scrum Fundamentals Certified
- Comfortable owning QA end to end: requirements, test planning, risk assessment, execution and release sign-off

Available for freelance QA work on Upwork.

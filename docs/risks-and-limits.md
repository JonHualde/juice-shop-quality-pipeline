# Risks and Limits

- Coverage targets authentication, authorization, account navigation and the basket; it does not prove the full product (checkout and catalog search are not covered).
- Juice Shop's basket row buttons (decrease, increase, delete) have no accessible name, so the basket page object locates them by position. A table layout change would break those three locators first; it is also an accessibility defect in the app.
- Tests currently run on Chromium only.
- Updating the pinned Juice Shop image may change API or UI contracts.
- Anonymous order history returns `500` instead of the expected authorization error; this is tracked as a known issue.
- Juice Shop is intentionally vulnerable and should remain isolated from production systems.
- Newman includes known vulnerable transitive development dependencies; forced upgrades are avoided until a compatible fix exists.

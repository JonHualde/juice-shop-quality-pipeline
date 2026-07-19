# Risks and Limits

- Coverage targets authentication, authorization, and account navigation; it does not prove the full product.
- Tests currently run on Chromium only.
- Updating the pinned Juice Shop image may change API or UI contracts.
- Anonymous order history returns `500` instead of the expected authorization error; this is tracked as a known issue.
- Juice Shop is intentionally vulnerable and should remain isolated from production systems.
- Newman includes known vulnerable transitive development dependencies; forced upgrades are avoided until a compatible fix exists.

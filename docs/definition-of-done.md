# Definition of Done

The portfolio release is complete when:

- Juice Shop starts from the pinned Docker image and becomes healthy.
- All Newman API assertions pass.
- All Playwright E2E tests pass on Chromium.
- API and E2E quality gates pass in GitHub Actions.
- CI uploads reports and Docker logs, then tears down the environment.
- No credentials, tokens, reports, or generated test data are committed.
- Strategy, coverage, execution, and known limits are documented.

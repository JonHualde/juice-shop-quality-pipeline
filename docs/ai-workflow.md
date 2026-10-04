# AI Workflow: Agents Write Tests, a Human Signs Them Off

AI agents help write and repair the Playwright tests in this repository. They do not decide what gets merged, and CI runs without them.

## The Loop

1. **Plan.** `playwright-test-planner` explores the running app from the seed state and writes a test plan in `specs/`. I choose the scope (risk-based, a few scenarios) in the prompt.
2. **Generate.** `playwright-test-generator` drives a real browser through each scenario with the Playwright test MCP server and writes one spec per scenario.
3. **Heal.** `playwright-test-healer` runs failing tests, inspects the page and fixes the test code. It is told to fix causes, never to add retries, longer timeouts, sleeps or forced clicks.
4. **Review.** Every agent output is committed unchanged, then reviewed in a separate commit. The review is where the code is brought in line with the suite: page objects, fixtures, naming, documented limits.
5. **Prove.** Before review is done, the suite runs green several times in a row locally, then in CI.

CI (`.github/workflows/qa.yml`) only runs the committed specs. No model is called in the pipeline.

## Setup

```bash
npx playwright init-agents --loop=claude
```

This creates the three agent definitions in `.claude/agents/` and the Playwright test MCP server in `.mcp.json`, for Claude Code. `tests/e2e/seed.spec.ts` signs in a fresh customer on the catalog: every planned scenario starts from that state.

Run an agent headless, for example the healer:

```bash
docker compose up -d --wait
claude -p "Fix the failing E2E tests. Fix the cause: no retries, longer timeouts, waitForTimeout or forced clicks." \
  --agent playwright-test-healer --mcp-config .mcp.json --strict-mcp-config \
  --allowedTools mcp__playwright-test Read Glob Grep LS Edit MultiEdit Write
```

## Two Worked Examples

### Healer: a real flaky test

Locally, 4 to 5 of the 5 E2E tests timed out. CI had been green by timing luck.

- **Agent:** found that `isVisible()` does not wait. The welcome dialog renders a moment after load, the check skipped it, and its backdrop then intercepted every click. It made the component wait for each dialog, click it and wait for it to close.
- **Review:** renamed `dismissIfVisible` to `dismissAll`, because the method now always waits for both dialogs.
- **Result:** 15/15 over 3 local runs.
- Pull request: [#2](https://github.com/JonHualde/juice-shop-quality-pipeline/pull/2).

### Planner and generator: basket coverage

The basket was "Risk analysis pending" in the coverage matrix.

- **Agents:** the planner wrote [`specs/basket.md`](../specs/basket.md) (add, change quantity, remove). The generator wrote one spec per scenario: 9/9 green over 3 runs, unchanged.
- **Review:** the generated specs worked but copied the sign-in into each file and kept raw locators in the tests. They now use `CatalogPage`, `BasketPage` and a `signedInCustomer` fixture. The row buttons have no accessible name in Juice Shop, so they are located by position, in one place, with the reason written down.
- **Result:** 24/24 over 3 local runs, then CI.
- Pull request: [#3](https://github.com/JonHualde/juice-shop-quality-pipeline/pull/3).

## What the Agents Got Wrong or Left Out

- The generator had no shell, so it could not run its own tests. Running them stays a human step.
- Generated code follows the plan, not the repository's conventions. The review commit is not optional.
- The healer's fix assumes both startup dialogs always appear on a fresh context. True for the pinned Juice Shop image; it would time out if one disappeared. Written down here rather than hidden behind a conditional.

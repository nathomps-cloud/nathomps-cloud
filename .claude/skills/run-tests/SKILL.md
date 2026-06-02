---
name: run-tests
description: Run the Vitest test suite and summarize results
disable-model-invocation: true
allowed-tools: Bash(npm test)
---

Run the test suite:

```bash
npm test
```

Report how many tests passed and failed. For each failure, show the test name and the assertion error. If all pass, confirm the count.

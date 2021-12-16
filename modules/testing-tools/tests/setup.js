const perf_hooks = require('perf_hooks')

perf_hooks.performance = { now: jest.fn().mockReturnValue(0) }

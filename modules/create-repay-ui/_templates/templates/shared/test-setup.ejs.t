---
to: "<%=directory%>/<%=name%>/src/tests/__setup__/<%=type === 'typescript' ? 'setup.ts' : 'setup.js' %>"
---
import '@testing-library/jest-dom'

jest.mock('../../helpers/api')

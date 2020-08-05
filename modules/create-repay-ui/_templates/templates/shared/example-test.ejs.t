---
to: "<%=directory%>/<%=name%>/src/tests/<%=type === 'typescript' ? 'Home.test.tsx' : 'Home.test.jsx' %>"
---
import { StyleProvider } from '@repay/cactus-web'
import { render } from '@testing-library/react'
import * as React from 'react'

import Home from '../../src/components/Home'

describe('Test case 1', () => {
  test('Can render the Home component', () => {
    const { container } = render(
      <StyleProvider>
        <Home />
      </StyleProvider>
    )

    expect(container).toMatchSnapshot()
  })
})

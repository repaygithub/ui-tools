---
to: "<%=directory%>/<%=name%>/tests/<%=type === 'typescript' ? 'Home.test.tsx' : 'Home.test.jsx' %>"
---
import { StyleProvider } from '@repay/cactus-web'
import { render } from '@testing-library/react'
import * as React from 'react'

import Home from '../src/components/Home'

describe('Test case 1', () => {
  test('Home page text is visible', () => {
    const { getByText } = render(
      <StyleProvider>
        <Home />
      </StyleProvider>
    )

    expect(getByText('This is the Home Page')).toBeVisible()
  })
})

---
to: <%=directory%>/<%=name%>/src/components/Layout.jsx
---

import { Link } from '@reach/router'
import { MenuBar } from '@repay/cactus-web'
import * as React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <MenuBar>
        <MenuBar.Item as={Link} to="/">
          Home Page
        </MenuBar.Item>
        <MenuBar.List title="A Group of Pages">
          <MenuBar.Item as="a" href="https://repaygithub.github.io/cactus/">
            Cactus Docs
          </MenuBar.Item>
          <MenuBar.List title="Nested Submenu">
            <MenuBar.Item as={Link} to="/users">
              Another link to users
            </MenuBar.Item>
          </MenuBar.List>
        </MenuBar.List>
      </MenuBar>
      {children}
    </>
  )
}

export default Layout

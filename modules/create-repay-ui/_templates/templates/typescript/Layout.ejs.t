---
to: <%=directory%>/<%=name%>/src/components/Layout.tsx
---

import { RouteComponentProps, useNavigate } from '@reach/router'
import { MenuBar } from '@repay/cactus-web'
import * as React from 'react'

interface LayoutProps extends RouteComponentProps {
  chidlren?: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      <MenuBar>
        <MenuBar.Item onClick={() => navigate('/')}>Some Page</MenuBar.Item>
        <MenuBar.List title="A Group of Pages">
          <MenuBar.Item as="a" href="https://repaygithub.github.io/cactus/">
            Cactus Docs
          </MenuBar.Item>
          <MenuBar.List title="Nested Submenu">
            <MenuBar.Item onClick={() => navigate('/users')}>Antoher link to users</MenuBar.Item>
          </MenuBar.List>
        </MenuBar.List>
      </MenuBar>
      {children}
    </>
  )
}

export default Layout

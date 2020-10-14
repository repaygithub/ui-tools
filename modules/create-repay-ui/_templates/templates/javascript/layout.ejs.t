---
to: <%=directory%>/<%=name%>/src/components/AppLayout.jsx
---
import { DescriptiveClock } from '@repay/cactus-icons'
import { ActionBar, BrandBar, Footer, Layout, MenuBar } from '@repay/cactus-web'
import * as React from 'react'
import { Link } from 'react-router-dom'

const LOGO =
  'https://repay-merchant-resources.s3.amazonaws.com/staging/24bd1970-a677-4ca7-a4d2-e328ddd4691b/repay_logo_new.jpg'

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <BrandBar userMenuText="Hershell Jewess" logo={LOGO}>
        <BrandBar.UserMenuItem onSelect={() => {}}>Settings</BrandBar.UserMenuItem>
        <BrandBar.UserMenuItem onSelect={() => {}}>Logout</BrandBar.UserMenuItem>
      </BrandBar>
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
      <ActionBar>
        <ActionBar.Item
          id="time"
          icon={<DescriptiveClock />}
          aria-label="What time is it?"
          onClick={() => alert(`It is now ${new Date()}.`)}
        />
      </ActionBar>
      <Layout.Content>{children}</Layout.Content>
      <Footer logo={LOGO}>
        Realtime Electronic Payments
        <Footer.Link to="https://www.repay.com/">REPAY Website</Footer.Link>
        <Footer.Link to="#">Link to Nowhere</Footer.Link>
      </Footer>
    </Layout>
  )
}

export default AppLayout

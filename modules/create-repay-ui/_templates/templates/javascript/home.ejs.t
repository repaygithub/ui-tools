---
to: <%=directory%>/<%=name%>/src/components/Home.jsx
---
import { Link as RouterLink } from '@reach/router'
import { Card, Flex, Link, Text } from '@repay/cactus-web'
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <Flex justifyContent="flex-start">
        <Card margin="40px">
          <Text as="h4">This is some text in a card</Text>
          <Text>Here are some links:</Text>
          <Link as={RouterLink} to="/users">
            Users page
          </Link>
        </Card>
      </Flex>
    </div>
  )
}

export default Home

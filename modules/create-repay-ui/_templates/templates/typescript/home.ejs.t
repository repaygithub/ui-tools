---
to: <%=directory%>/<%=name%>/src/components/Home.tsx
---
import { Link } from '@reach/router'
import { RouteComponentProps } from '@reach/router'
import React from 'react'

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <Link to="/users">Users page</Link>
    </div>
  )
}

export default Home

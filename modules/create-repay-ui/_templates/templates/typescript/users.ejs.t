---
to: <%=directory%>/<%=name%>/src/components/Users.tsx
---
import { RouteComponentProps } from '@reach/router'
import React from 'react'

const Users: React.FC<RouteComponentProps> = () => (
  <ul>
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
  </ul>
)

export default Users

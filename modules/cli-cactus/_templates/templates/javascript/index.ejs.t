---
to: <%=directory%>/<%=name%>/src/index.jsx
---
import React from 'react'
import ReactDOM from 'react-dom'

const Hello = () => <h1>Welcome to Cactus!</h1>

ReactDOM.render(<Hello />, document.getElementById('root'))

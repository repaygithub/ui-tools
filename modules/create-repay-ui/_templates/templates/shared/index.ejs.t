---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'index.tsx' : 'index.jsx' %>"
---
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

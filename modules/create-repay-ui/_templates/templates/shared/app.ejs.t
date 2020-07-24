---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'App.tsx' : 'App.jsx' %>"
---
import { Router } from '@reach/router'
import React, { lazy, Suspense } from 'react'

import Loading from './components/Loading'

const LazyHome = lazy(() => import('./components/Home'))
const LazyUsers = lazy(() => import('./components/Users'))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <LazyUsers path="users" />
      <LazyHome path="/" />
    </Router>
  </Suspense>
)

export default App

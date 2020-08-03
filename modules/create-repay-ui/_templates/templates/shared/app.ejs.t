---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'App.tsx' : 'App.jsx' %>"
---
import { Router } from '@reach/router'
import { StyleProvider } from '@repay/cactus-web'
import React, { lazy, Suspense } from 'react'

import Layout from './components/Layout'
import Loading from './components/Loading'

const LazyHome = lazy(() => import('./components/Home'))
const LazyUsers = lazy(() => import('./components/Users'))

const App = () => (
  <StyleProvider>
    <Suspense fallback={<Loading />}>
      <Router>
        <Layout default>
          <LazyUsers path="users" />
          <LazyHome path="/" />
        </Layout>
      </Router>
    </Suspense>
  </StyleProvider>
)

export default App


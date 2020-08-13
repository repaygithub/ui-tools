---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'App.tsx' : 'App.jsx' %>"
---
import { Router } from '@reach/router'
import { Spinner, StyleProvider } from '@repay/cactus-web'
import React, { lazy, Suspense } from 'react'

import Layout from './components/Layout'

const LazyHome = lazy(() => import('./components/Home'))
const LazyUsers = lazy(() => import('./components/Users'))

const App = () => (
  <StyleProvider global>
    <Suspense fallback={<Spinner />}>
      <Layout>
        <Router>
          <LazyUsers path="users" />
          <LazyHome path="/" />
        </Router>
      </Layout>
    </Suspense>
  </StyleProvider>
)

export default App

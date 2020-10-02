---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'App.tsx' : 'App.jsx' %>"
---
import { Spinner, StyleProvider } from '@repay/cactus-web'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'

const LazyHome = lazy(() => import('./components/Home'))
const LazyUsers = lazy(() => import('./components/Users'))

const App = () => (
  <StyleProvider global>
    <Suspense fallback={<Spinner />}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/users">
              <LazyUsers />
            </Route>
            <Route path="/">
              <LazyHome />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  </StyleProvider>
)

export default App

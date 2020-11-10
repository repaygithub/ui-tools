---
to: "<%=directory%>/<%=name%>/src/<%=type === 'typescript' ? 'App.tsx' : 'App.jsx' %>"
---
import { Spinner, StyleProvider } from '@repay/cactus-web'
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppLayout from './components/AppLayout'

const LazyHome = lazy(() => import('./components/Home'))
const LazyUsers = lazy(() => import('./components/Users'))

const App<%= type === 'typescript' ? ': React.FC' : '' %> = () => (
  <StyleProvider global>
    <Router>
      <AppLayout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/users">
              <LazyUsers />
            </Route>
            <Route path="/">
              <LazyHome />
            </Route>
          </Switch>
        </Suspense>
      </AppLayout>
    </Router>
  </StyleProvider>
)

export default App

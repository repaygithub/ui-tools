import React from 'react'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
container.className = 'app-root'
document.body.appendChild(container)

const App = () => {
  return <div className="react-root">Testing Text</div>
}

ReactDOM.render(<App />, container)

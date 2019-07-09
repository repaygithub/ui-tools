import App from './app'
import React from 'react'
import ReactDOM from 'react-dom'

const container = document.createElement('div')
container.className = 'app-root'
document.body.appendChild(container)

ReactDOM.render(<App />, container)

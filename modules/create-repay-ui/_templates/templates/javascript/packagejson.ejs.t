---
to: <%=directory%>/<%=name%>/package.json
---
{
  "version": "0.0.1",
  "description": "",
  "main": "src/index.js",
  "name": "<%=name%>",
  "scripts": {
    "start": "repay-scripts dev -p 3435 src/index.jsx",
    "build": "repay-scripts build src/index.jsx",
    "lint": "eslint \"**/*.{js,jsx}\"",
    "fmt": "yarn lint --fix"
  },
  "keywords": [],
  "license": "MIT",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "axios": "^0.19.2"
  },
  "devDependencies": {
    "@repay/eslint-config": "^3.0.0",
    "eslint": "^7.4.0",
    "@repay/scripts": "^2.0.0",
    "prettier": "^2.0.5"
  }
}

---
to: <%=directory%>/<%=name%>/package.json
---
{
  "version": "0.0.1",
  "description": "",
  "main": "src/index.js",
  "name": "<%=name%>",
  "scripts": {
    "start": "repay-scripts dev --config webpack.config.js -p 3435 src/index.tsx",
    "build": "repay-scripts build src/index.tsx --config webpack.config.js",
    "lint": "eslint \"**/*.{js,jsx,ts,tsx}\"",
    "fmt": "yarn lint --fix",
    "test:types": "tsc -p ./tsconfig.json --noEmit"

  },
  "keywords": [],
  "license": "MIT",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "devDependencies": {
    "@types/react": "^16.9.5",
    "@types/react-dom": "^16.9.2",
    "typescript": "^3.7.2",
    "typescript-eslint-parser": "^22.0.0",
    "@repay/eslint-config": "^2.0.0",
    "eslint": "^7.2.0",
    "@repay/scripts": "0.5.0",
    "prettier": "^2.0.5"
  }
}
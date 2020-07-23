---
to: <%=directory%>/<%=name%>/package.json
---
{
  "version": "0.0.1",
  "description": "",
  "main": "src/index.js",
  "name": "<%=name%>",
  "scripts": {
    "start": "repay-scripts dev -p 3435 src/index.tsx",
    "build": "repay-scripts build src/index.tsx",
    "lint": "eslint \"**/*.{js,jsx,ts,tsx}\"",
    "fmt": "yarn lint --fix",
    "test:types": "tsc -p ./tsconfig.json --noEmit"

  },
  "keywords": [],
  "license": "MIT",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "axios": "^0.19.2"
  },
  "devDependencies": {
    "@types/react": "^16.9.5",
    "@types/react-dom": "^16.9.2",
    "typescript": "^3.7.2",
    "@typescript-eslint/parser": "^3.6.0",
    "@repay/eslint-config": "^3.0.0",
    "eslint": "^7.4.0",
    "@repay/scripts": "^2.0.0",
    "prettier": "^2.0.5"
  }
}

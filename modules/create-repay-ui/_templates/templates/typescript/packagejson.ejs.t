---
to: <%=directory%>/<%=name%>/package.json
---
{
  "version": "0.0.1",
  "description": "",
  "main": "src/index.tsx",
  "name": "<%=name%>",
  "scripts": {
    "start": "repay-scripts dev -p 3435 src/index.tsx",
    "build": "repay-scripts build src/index.tsx",
    "lint": "eslint \"**/*.{js,jsx,ts,tsx}\"",
    "fmt": "yarn lint --fix",
    "test:types": "tsc -p ./tsconfig.json --noEmit",
    "test": "jest"
  },
  "keywords": [],
  "license": "MIT",
  "dependencies": {
    "@repay/cactus-web": "^2.0.0",
    "react-router-dom": "^5.2.0",
    "axios": "^0.19.2",
    "prop-types": "^15.7.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-is": "^16.13.1",
    "styled-components": "^5.1.1"
  },
  "devDependencies": {
    "@babel/core": "^7.11.1",
    "@repay/babel-preset": "^1.0.0",
    "@repay/eslint-config": "^3.0.0",
    "@repay/scripts": "^2.0.0",
    "@testing-library/jest-dom": "^5.11.2",
    "@testing-library/react": "^10.4.3",
    "@types/react": "^16.9.5",
    "@types/react-dom": "^16.9.2",
    "@types/styled-components": "^5.1.2",
    "@types/styled-system": "^5.1.10",
    "@types/react-router-dom": "5.1.5",
    "@typescript-eslint/parser": "^3.6.0",
    "babel-jest": "^26.3.0",
    "eslint": "^7.6.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^26.2.2",
    "jest-raw-loader": "^1.0.1",
    "prettier": "^2.0.5",
    "typescript": "^3.7.2"
  }
}

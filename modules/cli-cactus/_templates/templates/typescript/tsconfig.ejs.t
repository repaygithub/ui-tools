---
to: <%=directory%>/<%=name%>/tsconfig.json
---
{
  "compilerOptions": {
    "lib": ["esnext", "dom","dom.iterable"],
    "strict": true,
    "jsx": "react",
    "declaration": true,
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["react"]
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

# NextJS using Typescript

https://nextjs.org/learn/excel/typescript/setup

1. Make NextJS app

npx create-next-app

2. Add typescript dependencies

npm install --save-dev typescript @types/react @types/node

3. Change run scripts

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

4. Run NextJS application as dev stage

```bash
npm run dev
```

And then tsconfig.json will be created automatically

```
[ wait ]  starting the development server ...
[ info ]  waiting on http://localhost:3000 ...
We detected TypeScript in your project and created a tsconfig.json file for you.
```

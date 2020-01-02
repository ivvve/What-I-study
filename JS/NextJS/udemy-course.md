- init project

```bash
npx create-next-app

# or

npm install --save react react-dom next
```

- start app

```bash
npm run dev
```

http://localhost:3000/

- Nav component

index.js의 Nav는 components의 nav.js이다.
이를 주석처리하면 index 페이지 상단에 Nav bar가 없어지는 걸 확인할 수 있다.

---

- Functional Components

![](2020-01-03-07-31-05.png)

pages에 추가하면 해당 파일명으로 path가 생성된다.

```tsx
// about.tsx
// functional component
const About = () => {
  const message = 'Hello World';
  return (
    <h1>Hello About Page - {message}</h1>
  );

  // return React.createElement('div', null, `React.createElement`);
};

export default About;
```

http://localhost:3000/about

![](2020-01-03-07-33-50.png)

- Class Components

```tsx
import React from "react";

class About extends React.Component<any, any> {
  render() {
    const message = "Hello World!";
    return (
      <h1>I'm class component: {message}</h1>
    )
  }
}

export default About;
```
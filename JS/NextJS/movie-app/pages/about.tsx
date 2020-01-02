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

// // functional component
//
// const About = () => {
//   const message = 'Hello World';
//   // return (
//   //   <h1>Hello About Page - {message}</h1>
//   // );
//
//   return React.createElement('div', null, `React.createElement`);
// };
//
// export default About;

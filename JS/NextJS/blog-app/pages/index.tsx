import React, {useEffect} from 'react'
import BaseLayout from "../components/base-layout";
import axios from 'axios';

export default function Home({ message, data }) {
  console.log(message);
  console.log(data);

  useEffect(() => {
    console.log('use effect');
  });

  console.log('before');

  return (
    <BaseLayout>
      <h1>I'm index</h1>
    </BaseLayout>
  )
}

Home.getInitialProps = async function() {
  const data = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

  return { message: 'message from server', data: data.data }
};

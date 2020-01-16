import React, {useEffect} from 'react'
import BaseLayout from "../components/base-layout";

export default function Home() {
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

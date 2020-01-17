import React from "react";
import BaseLayout from "../components/base-layout";
import axios from "axios";

interface PortfoliosInitialProps {
  posts: Post[];
}

export default function Portfolios({ posts }: PortfoliosInitialProps) {


  return (
    <BaseLayout>
      <h1>I'm Portfolios!</h1>

      {
        posts.map(post => {
          return (
            <div>
              <p>{post.id}</p>
              <p>{post.title}</p>
            </div>
          )
        })
      }

    </BaseLayout>
  )
}

Portfolios.getInitialProps = async function() {
  const posts: Post[] = await axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.data);

  return { posts: posts.splice(0, 10) }
}

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

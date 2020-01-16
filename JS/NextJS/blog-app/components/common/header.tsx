import Link from "next/link";
import React from "react";

import '../../styles/main.scss';

export default function Header() {
  return (
    <div>
      <Link href='/'><a>Index</a></Link>
      <Link href='/about'><a>About</a></Link>
      <Link href='/blogs'><a>Blogs</a></Link>
      <Link href='/portfolios'><a>Portfolios</a></Link>
      <Link href='/cv'><a>cv</a></Link>

      <p className='customClass'>Styles!</p>

      <style jsx>
        {`
          a {
            font-size: 20px;
          };
        `}
      </style>
    </div>
  );
}

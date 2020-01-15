import React from "react";
import Header from "./common/header";

type BaseLayoutProps = {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Header/>
      { children }
    </>
  )
}

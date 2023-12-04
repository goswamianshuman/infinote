import React from "react";

type Props = {
  children: React.ReactNode;
};

const PreviewLayout = (props: Props) => {
  return <div className="h-full dark:bg-[#1F1F1F]">{props.children}</div>;
};

export default PreviewLayout;

import { Spin } from "antd";
import React from "react";

interface Props {
  tip?: string;
  fullPage?: boolean;
}

const Loader: React.FC<Props> = ({ tip, fullPage }) => (
  <div className={`flex ${fullPage ? "h-screen" : "h-full"} w-full`}>
    <Spin size="large" className="m-auto" tip={tip} />
  </div>
);

export default Loader;

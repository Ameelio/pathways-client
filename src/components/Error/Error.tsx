import { Result } from "antd";
import { ResultProps } from "antd/lib/result";
import React from "react";

interface Props extends ResultProps {}

const ErrorPage = (props: Props) => {
  return (
    <div className="flex h-screen w-screen">
      <Result {...props} className="m-auto" />
    </div>
  );
};

export default ErrorPage;

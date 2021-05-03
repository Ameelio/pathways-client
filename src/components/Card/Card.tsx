import React from "react";
import { Card as AntdCard, CardProps } from "antd";

interface Props extends CardProps {}

const Card = (props: Props) => {
  return <AntdCard {...props} className={"rounded"} />;
};

export default Card;

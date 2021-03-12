import { Typography } from "antd";
import React from "react";
import Countdown from "react-countdown";

interface Props {
  endTime: number;
  style?: React.CSSProperties;
  className?: string;
}
// Renderer callback with condition
const renderer = ({
  minutes,
  seconds,
  completed,
}: {
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  return completed ? (
    <div />
  ) : (
    <Typography.Text className="text-white">
      {minutes}:{seconds}
    </Typography.Text>
  );
};

export const Timer = ({ endTime, style, className }: Props) => {
  return (
    <div style={style} className={className}>
      <Countdown date={endTime} renderer={renderer} />{" "}
    </div>
  );
};

import { Typography } from "antd";
import React from "react";
import Countdown from "react-countdown";
import { ISOString } from "src/types/Call";
import { mapCountdownTimeToStyle } from "src/utils";

interface Props {
  endTime: ISOString;
  style?: React.CSSProperties;
  className?: string;
}
// Renderer callback with condition
const renderer = ({
  formatted,
  minutes,
  seconds,
  completed,
}: {
  formatted: { minutes: string; seconds: string };
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  const style = mapCountdownTimeToStyle(minutes, seconds);

  return completed ? (
    <div />
  ) : (
    <Typography.Text className={`${style} px-6 py-4 rounded-md text-lg`}>
      {formatted.minutes}:{formatted.seconds}
    </Typography.Text>
  );
};

export const Timer = ({ endTime, style, className }: Props) => {
  return (
    <div style={style} className={className}>
      <Countdown date={endTime} renderer={renderer} zeroPadTime={2} />{" "}
    </div>
  );
};

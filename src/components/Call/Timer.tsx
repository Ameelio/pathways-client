import { Typography } from "antd";
import React from "react";
import Countdown from "react-countdown";
import { ISOString } from "src/types/Visit";
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
    <Typography.Text className={`${style} px-4 py-2 rounded-md`}>
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

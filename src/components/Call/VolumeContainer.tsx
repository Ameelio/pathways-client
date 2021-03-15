import React, { HTMLAttributes } from "react";
import "./VolumeContainer.scss";

type PropsType = HTMLAttributes<HTMLDivElement> & {
  audioVolume: number;
};

export const VolumeContainer = ({ audioVolume, ...props }: PropsType) => {
  return (
    <div {...props}>
      <div className={`bar.level${audioVolume}`} />
    </div>
  );
};

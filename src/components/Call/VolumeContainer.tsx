import React from "react";
import "./VolumeContainer.scss";

interface Props {
  audioVolume: number;
}

export const VolumeContainer = ({ audioVolume }: Props) => {
  return (
    <div className="volume-container">
      <div className={`bar.level${audioVolume}`} />
    </div>
  );
};

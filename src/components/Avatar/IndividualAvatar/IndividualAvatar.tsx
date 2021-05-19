import React from "react";
import { InitialsAvatar } from "./InitialsAvatar";
import { AvatarProps, Image } from "antd";

interface Props extends AvatarProps {
  fallback: string;
  size?: number;
  src?: string;
}

const IndividualAvatar = ({ fallback, size, src }: Props) => {
  return src ? (
    <Image src={src} width={size || 200} />
  ) : (
    <InitialsAvatar name={fallback} size={size || "default"} shape="square" />
  );
};

export default IndividualAvatar;

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
    <Image
      src={src}
      width={size || 200}
      height={size || 200}
      preview={false}
      className="object-cover rounded-full"
    />
  ) : (
    <InitialsAvatar name={fallback} size={size || "default"} shape="circle" />
  );
};

export default IndividualAvatar;

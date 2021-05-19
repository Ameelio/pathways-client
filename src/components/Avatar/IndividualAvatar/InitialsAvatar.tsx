import { Avatar } from "antd";
import { AvatarProps } from "antd/lib/avatar";
import React from "react";
import { getInitials } from "src/utils";
import { getAvatarBackgroundColor } from "src/utils/UI";

interface Props extends AvatarProps {
  name: string;
}
export const InitialsAvatar = ({ name, ...props }: Props): JSX.Element => (
  <Avatar className={getAvatarBackgroundColor(name)} {...props}>
    {getInitials(name)}
  </Avatar>
);

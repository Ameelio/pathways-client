import { Button, Space, Typography } from "antd";
import { ButtonShape, ButtonType } from "antd/lib/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  type?: ButtonType;
  danger?: boolean;
  block?: boolean;
  size?: SizeType;
  shape?: ButtonShape;
  style?: React.CSSProperties;
}

const IconButton = ({
  icon,
  label,
  onClick,
  type,
  danger,
  block,
  size,
  shape,
  style,
}: Props) => {
  return (
    <Space direction="vertical" align="center">
      <Button
        icon={icon}
        onClick={onClick}
        type={type}
        block={block}
        danger={danger}
        size={size || "large"}
        shape={shape || "round"}
        style={style}
      ></Button>
      <Typography.Text type="secondary">{label}</Typography.Text>
    </Space>
  );
};

export default IconButton;

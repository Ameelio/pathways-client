import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const EditButton: React.FC = ({ children }: Props) => (
  <Button
    type="primary"
    icon={<SaveOutlined />}
    size="large"
    className="rounded"
  >
    {children}
  </Button>
);

export default EditButton;

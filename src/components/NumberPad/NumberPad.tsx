import React, { useState } from "react";
import { Row, Col, Input, Modal, Button } from "antd";
import Icon from "@ant-design/icons";
import BackspaceKeySvg from "src/assets/Icons/BackspaceKeySvg";

interface Props {
  setInput: (input: string) => void;
  className?: string;
  visible?: boolean;
}

const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

const NumberPad = ({ setInput, visible, className }: Props) => {
  const [result, setResult] = useState("");

  return (
    <Modal
      visible={visible}
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={() => setInput(result)}
      className={className}
      closable={false}
    >
      <Row className="flex justify-center	">
        <Input.Password
          placeholder="input password"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          bordered={true}
          autoFocus={true}
        />
      </Row>

      <Row
        align="middle"
        justify="space-between"
        className="flex justify-center mt-4 py-2"
      >
        {keys.map((k, index) => (
          <Col
            span={8}
            className="flex justify-center mt-4"
            // last
            offset={index === keys.length - 1 ? 8 : 0}
          >
            <Button
              onClick={() => setResult((prev) => `${prev}${k}`)}
              className="text-2xl font-bold bg-gray-200 p-0"
              shape="circle"
            >
              {k}
            </Button>
          </Col>
        ))}
        <Col span={8} className="flex justify-center mt-4 p-0">
          <Icon
            onClick={() => setResult((prev) => prev.slice(0, -1))}
            className="text-gray-500"
            component={BackspaceKeySvg}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default NumberPad;

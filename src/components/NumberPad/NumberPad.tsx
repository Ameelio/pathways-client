import React, { useState } from "react";
import { Row, Col, Input, Modal, Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
interface Props {
  input: string;
  setInput: (input: string) => void;
  className?: string;
  visible?: boolean;
}

const keys = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const NumberPad = ({ input, setInput, visible, className }: Props) => {
  const [result, setResult] = useState(input);

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
          readOnly={true}
          bordered={false}
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
              className="text-2xl font-bold bg-gray-200"
              shape="circle"
            >
              {k}
            </Button>
          </Col>
        ))}
        <Col span={8} className="flex justify-center mt-4">
          <CloseCircleFilled
            onClick={() => setResult((prev) => prev.slice(0, -1))}
            className="text-2xl text-gray-500"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default NumberPad;

import { Avatar } from "antd";
import React from "react";

interface Props {
  initials: string;
}

const VideoMePlaceholder: React.FC<Props> = ({ initials }) => {
  return (
    <div style={Styles.background}>
      <Avatar size={64} style={Styles.avatar}>
        {initials}
      </Avatar>
    </div>
  );
};
const Styles = {
  background: {
    backgroundColor: "black",
    position: "absolute",
    top: 16,
    left: 16,
    width: "300px",
    height: "200px",
    zIndex: 9999,
    display: "flex",
  } as React.CSSProperties,
  avatar: {
    color: "#f56a00",
    backgroundColor: "#fde3cf",
    margin: "auto",
  },
};

export default VideoMePlaceholder;

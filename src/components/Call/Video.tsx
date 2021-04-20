import { VideoHTMLAttributes, useEffect, useRef, useState } from "react";
import { FADING_ANIMATION_DURATION } from "src/utils/constants";

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
  isFadingOut?: boolean;
};

export default function Video({ srcObject, isFadingOut, ...props }: PropsType) {
  const refVideo = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
  }, [srcObject]);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.addEventListener("loadeddata", () => setLoading(false));
  }, []);

  return (
    <video
      ref={refVideo}
      {...props}
      style={{
        ...props.style,
        opacity: loading || isFadingOut ? 0 : 1,
        transition: `opacity, ${FADING_ANIMATION_DURATION}s ease-in-out`,
      }}
    />
  );
}

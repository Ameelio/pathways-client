import { AudioHTMLAttributes, useEffect, useRef, useState } from "react";
import { FADING_ANIMATION_DURATION } from "src/constants";

type PropsType = AudioHTMLAttributes<HTMLAudioElement> & {
  srcObject: MediaStream;
  isFadingOut?: boolean;
};

const VOLUME_INCREMENT = 1.0 / FADING_ANIMATION_DURATION;

export default function Video({ srcObject, isFadingOut, ...props }: PropsType) {
  const refAudio = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.01);

  useEffect(() => {
    if (!refAudio.current) return;
    refAudio.current.srcObject = srcObject;
  }, [srcObject]);

  // Fade in effect
  useEffect(() => {
    if (!refAudio.current) return;

    refAudio.current.addEventListener("loadeddata", () => {
      const timer = setTimeout(() => {
        if (isFadingOut) return;
        setVolume((vol) => Math.min(vol + VOLUME_INCREMENT, 1));
      }, 1e3);

      return () => clearTimeout(timer);
    });
  }, [isFadingOut]);

  // Fadeout effect
  useEffect(() => {
    if (!refAudio.current) return;

    const timer = setTimeout(() => {
      if (!isFadingOut) return;
      setVolume((vol) => Math.max(vol - VOLUME_INCREMENT, 0));
    }, 1e3);

    return () => clearTimeout(timer);
  }, [isFadingOut]);

  useEffect(() => {
    if (!refAudio.current) return;
    refAudio.current.volume = volume;
  }, [volume]);

  return <audio ref={refAudio} {...props} />;
}

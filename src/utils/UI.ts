import { Options } from "react-lottie";

export function getLottieOptions(lottie: any): Options {
  return {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
}

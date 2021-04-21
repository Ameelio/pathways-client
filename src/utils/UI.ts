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

function hashCode(str: string): number {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash);
  }
  return hash;
}
export function getAvatarBackgroundColor(name: string): string {
  const colors = [
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
    "bg-blue-900",
    "bg-blue-800",
    "bg-blue-700",
  ];
  return colors[Math.abs(hashCode(name) % colors.length)];
}

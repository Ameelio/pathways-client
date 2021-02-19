import { notification, message } from "antd";
import { BasePersona } from "src/types/User";

export function getRandomItem(items: Object[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export const getInitials = (str: string) => {
  return str
    .split(" ")
    .map((substr) => substr[0])
    .join("");
};

export const genFullName = (entity: BasePersona): string =>
  entity ? `${entity.firstName} ${entity.lastName}` : "";

export const openNotificationWithIcon = (
  message: string,
  description: string,
  type: "success" | "info" | "error" | "warning"
) => {
  notification[type]({
    message,
    description,
  });
};
export const showToast = (
  key: string,
  content: string,
  type: "success" | "error" | "warning" | "loading" | "info",
  duration = 3
) => {
  switch (type) {
    case "success":
      message.success({ content, key, duration });
      break;
    case "error":
      message.error({ content, key, duration });
      break;
    case "warning":
      message.warning({ content, key, duration });
      break;
    case "loading":
      message.loading({ content, key, duration });
      break;
    default:
      message.info({ content, key, duration });
      break;
  }
};

function hashCode(str: string): number {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash);
  }
  return hash;
}

export function generateBgColor(label: string): string {
  const BACKGROUND_COLORS = [
    "#093145",
    "#3C6478",
    "#107896",
    "#43ABC9",
    "#C2571A",
    "#9A2617",
  ];
  return BACKGROUND_COLORS[
    Math.abs(hashCode(label) % BACKGROUND_COLORS.length)
  ];
}
export function notEmpty<TParam>(
  value: TParam | null | undefined
): value is TParam {
  return value !== null && value !== undefined;
}

import { notification, message } from "antd";
import { BasePersona } from "src/types/User";

export function getRandomItem<TArrayItem>(items: TArrayItem[]): TArrayItem {
  return items[Math.floor(Math.random() * items.length)];
}

export const getInitials = (str: string) => {
  return str
    .split(" ")
    .map((substr) => substr[0])
    .join("");
};

export const getFullName = (entity: BasePersona): string =>
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

export function notEmpty<TParam>(
  value: TParam | null | undefined
): value is TParam {
  return value !== null && value !== undefined;
}

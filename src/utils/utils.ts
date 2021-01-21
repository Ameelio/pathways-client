import { BasePersona } from "src/types/User";

export function getRandomItem(items: Object[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export const genFullName = (entity: BasePersona): string =>
  entity ? `${entity.firstName} ${entity.lastName}` : "";

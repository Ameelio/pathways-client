export function getRandomItem(items: Object[]) {
  return items[Math.floor(Math.random() * items.length)];
}

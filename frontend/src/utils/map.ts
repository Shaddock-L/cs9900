export function updateElementInMap<T>(
  element: T,
  map: Map<T, number>,
  method = 1
) {
  if (method > 0) {
    if (map.get(element)) map.set(element, (map.get(element) as number) + 1);
    else map.set(element, 1);
  } else {
    if (map.get(element) !== undefined && (map.get(element) as number) > 1)
      map.set(element, (map.get(element) as number) - 1);
    else map.delete(element);
  }
}

export function convertManuItemMapToArray(itemsMap: Map<MenuItem, number>) {
  const items: MenuItem[] = [];

  itemsMap.forEach((quantity, item) => {
    for (let i = 0; i < quantity; i++) items.push(item);
  });

  return items;
}

export function convertMenuItemArrayToMap(itemsArr: MenuItem[]) {
  const map: Map<number, { item: MenuItem; quantity: number }> = new Map();

  itemsArr.forEach((item) => {
    const _quantity = map.get(item.id)?.quantity;

    if (_quantity) map.set(item.id, { item, quantity: _quantity + 1 });
    else map.set(item.id, { item, quantity: 1 });
  });

  return map;
}

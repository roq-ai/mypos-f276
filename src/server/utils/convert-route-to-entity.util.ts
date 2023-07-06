const mapping: Record<string, string> = {
  'add-ons': 'add_on',
  categories: 'category',
  discounts: 'discount',
  'food-items': 'food_item',
  orders: 'order',
  restaurants: 'restaurant',
  'shopping-carts': 'shopping_cart',
  'sub-categories': 'sub_category',
  users: 'user',
  variants: 'variant',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

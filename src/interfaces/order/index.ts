import { ShoppingCartInterface } from 'interfaces/shopping-cart';
import { DiscountInterface } from 'interfaces/discount';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  shopping_cart_id: string;
  discount_id?: string;
  created_at?: any;
  updated_at?: any;

  shopping_cart?: ShoppingCartInterface;
  discount?: DiscountInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  shopping_cart_id?: string;
  discount_id?: string;
}

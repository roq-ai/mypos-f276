import { OrderInterface } from 'interfaces/order';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface DiscountInterface {
  id?: string;
  name: string;
  percentage: number;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    order?: number;
  };
}

export interface DiscountGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  restaurant_id?: string;
}

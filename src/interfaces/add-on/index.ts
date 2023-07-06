import { FoodItemInterface } from 'interfaces/food-item';
import { GetQueryInterface } from 'interfaces';

export interface AddOnInterface {
  id?: string;
  name: string;
  food_item_id: string;
  created_at?: any;
  updated_at?: any;

  food_item?: FoodItemInterface;
  _count?: {};
}

export interface AddOnGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  food_item_id?: string;
}

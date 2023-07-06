import { FoodItemInterface } from 'interfaces/food-item';
import { CategoryInterface } from 'interfaces/category';
import { GetQueryInterface } from 'interfaces';

export interface SubCategoryInterface {
  id?: string;
  name: string;
  category_id: string;
  created_at?: any;
  updated_at?: any;
  food_item?: FoodItemInterface[];
  category?: CategoryInterface;
  _count?: {
    food_item?: number;
  };
}

export interface SubCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  category_id?: string;
}

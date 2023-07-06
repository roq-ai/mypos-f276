import { SubCategoryInterface } from 'interfaces/sub-category';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface CategoryInterface {
  id?: string;
  name: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  sub_category?: SubCategoryInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    sub_category?: number;
  };
}

export interface CategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  restaurant_id?: string;
}

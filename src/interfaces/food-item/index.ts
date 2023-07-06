import { AddOnInterface } from 'interfaces/add-on';
import { VariantInterface } from 'interfaces/variant';
import { SubCategoryInterface } from 'interfaces/sub-category';
import { GetQueryInterface } from 'interfaces';

export interface FoodItemInterface {
  id?: string;
  name: string;
  sub_category_id: string;
  created_at?: any;
  updated_at?: any;
  add_on?: AddOnInterface[];
  variant?: VariantInterface[];
  sub_category?: SubCategoryInterface;
  _count?: {
    add_on?: number;
    variant?: number;
  };
}

export interface FoodItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  sub_category_id?: string;
}

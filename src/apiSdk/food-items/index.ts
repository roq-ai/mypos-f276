import axios from 'axios';
import queryString from 'query-string';
import { FoodItemInterface, FoodItemGetQueryInterface } from 'interfaces/food-item';
import { GetQueryInterface } from '../../interfaces';

export const getFoodItems = async (query?: FoodItemGetQueryInterface) => {
  const response = await axios.get(`/api/food-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFoodItem = async (foodItem: FoodItemInterface) => {
  const response = await axios.post('/api/food-items', foodItem);
  return response.data;
};

export const updateFoodItemById = async (id: string, foodItem: FoodItemInterface) => {
  const response = await axios.put(`/api/food-items/${id}`, foodItem);
  return response.data;
};

export const getFoodItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/food-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFoodItemById = async (id: string) => {
  const response = await axios.delete(`/api/food-items/${id}`);
  return response.data;
};

import axios from 'axios';
import queryString from 'query-string';
import { ShoppingCartInterface, ShoppingCartGetQueryInterface } from 'interfaces/shopping-cart';
import { GetQueryInterface } from '../../interfaces';

export const getShoppingCarts = async (query?: ShoppingCartGetQueryInterface) => {
  const response = await axios.get(`/api/shopping-carts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShoppingCart = async (shoppingCart: ShoppingCartInterface) => {
  const response = await axios.post('/api/shopping-carts', shoppingCart);
  return response.data;
};

export const updateShoppingCartById = async (id: string, shoppingCart: ShoppingCartInterface) => {
  const response = await axios.put(`/api/shopping-carts/${id}`, shoppingCart);
  return response.data;
};

export const getShoppingCartById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shopping-carts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShoppingCartById = async (id: string) => {
  const response = await axios.delete(`/api/shopping-carts/${id}`);
  return response.data;
};

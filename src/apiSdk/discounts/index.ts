import axios from 'axios';
import queryString from 'query-string';
import { DiscountInterface, DiscountGetQueryInterface } from 'interfaces/discount';
import { GetQueryInterface } from '../../interfaces';

export const getDiscounts = async (query?: DiscountGetQueryInterface) => {
  const response = await axios.get(`/api/discounts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDiscount = async (discount: DiscountInterface) => {
  const response = await axios.post('/api/discounts', discount);
  return response.data;
};

export const updateDiscountById = async (id: string, discount: DiscountInterface) => {
  const response = await axios.put(`/api/discounts/${id}`, discount);
  return response.data;
};

export const getDiscountById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/discounts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDiscountById = async (id: string) => {
  const response = await axios.delete(`/api/discounts/${id}`);
  return response.data;
};

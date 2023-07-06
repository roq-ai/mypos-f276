import axios from 'axios';
import queryString from 'query-string';
import { AddOnInterface, AddOnGetQueryInterface } from 'interfaces/add-on';
import { GetQueryInterface } from '../../interfaces';

export const getAddOns = async (query?: AddOnGetQueryInterface) => {
  const response = await axios.get(`/api/add-ons${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAddOn = async (addOn: AddOnInterface) => {
  const response = await axios.post('/api/add-ons', addOn);
  return response.data;
};

export const updateAddOnById = async (id: string, addOn: AddOnInterface) => {
  const response = await axios.put(`/api/add-ons/${id}`, addOn);
  return response.data;
};

export const getAddOnById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/add-ons/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAddOnById = async (id: string) => {
  const response = await axios.delete(`/api/add-ons/${id}`);
  return response.data;
};

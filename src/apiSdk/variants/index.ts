import axios from 'axios';
import queryString from 'query-string';
import { VariantInterface, VariantGetQueryInterface } from 'interfaces/variant';
import { GetQueryInterface } from '../../interfaces';

export const getVariants = async (query?: VariantGetQueryInterface) => {
  const response = await axios.get(`/api/variants${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVariant = async (variant: VariantInterface) => {
  const response = await axios.post('/api/variants', variant);
  return response.data;
};

export const updateVariantById = async (id: string, variant: VariantInterface) => {
  const response = await axios.put(`/api/variants/${id}`, variant);
  return response.data;
};

export const getVariantById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/variants/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVariantById = async (id: string) => {
  const response = await axios.delete(`/api/variants/${id}`);
  return response.data;
};

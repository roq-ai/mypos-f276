import axios from 'axios';
import queryString from 'query-string';
import { SubCategoryInterface, SubCategoryGetQueryInterface } from 'interfaces/sub-category';
import { GetQueryInterface } from '../../interfaces';

export const getSubCategories = async (query?: SubCategoryGetQueryInterface) => {
  const response = await axios.get(`/api/sub-categories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSubCategory = async (subCategory: SubCategoryInterface) => {
  const response = await axios.post('/api/sub-categories', subCategory);
  return response.data;
};

export const updateSubCategoryById = async (id: string, subCategory: SubCategoryInterface) => {
  const response = await axios.put(`/api/sub-categories/${id}`, subCategory);
  return response.data;
};

export const getSubCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sub-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSubCategoryById = async (id: string) => {
  const response = await axios.delete(`/api/sub-categories/${id}`);
  return response.data;
};

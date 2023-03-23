import { CategoryDto } from 'dtos/Category/CategoryDto';
import { CategoryRequestDto } from 'dtos/Category/CategoryRequestDto';
import { handleDeleteResponse, handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<CategoryDto[]> => {
    const response = await HttpClient.get('/categories');
    return handleResponse<CategoryDto[]>(response);
  },

  create: async (createDto: CategoryRequestDto): Promise<CategoryDto> => {
    const response = await HttpClient.post('/categories', createDto);
    return handleResponse<CategoryDto>(response);
  },

  edit: async (id: number, updateDto: CategoryRequestDto): Promise<CategoryDto> => {
    const response = await HttpClient.put(`/categories/${id}`, updateDto);
    return handleResponse<CategoryDto>(response);
  },

  retire: async (id: number): Promise<void> => {
    const response = await HttpClient.removeOrRetire(`/categories/${id}`);
    return handleDeleteResponse(response);
  },
};

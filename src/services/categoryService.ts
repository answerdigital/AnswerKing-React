import { CategoryDto } from 'dtos/CategoryDto';
import { handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<CategoryDto[]> => {
    const response = await HttpClient.get('/categories');
    return handleResponse<CategoryDto[]>(response);
  },
};

import { CategoryDto } from 'dtos/CategoryDto';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<CategoryDto[]> => {
  const response = await httpClient.get('/categories/');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

export const categoryService = { getAll };

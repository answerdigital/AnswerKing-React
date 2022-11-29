import { CategoryDto } from 'dtos/CategoryDto';
import { ProductDto } from 'dtos/ProductDto';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<CategoryDto[]> => {
  const response = await httpClient.get('/categories');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const productsInCategory = async (id: number): Promise<ProductDto[]> => {
  const response = await httpClient.get('/categories/' + id + '/products');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const updateCategory = async (id: number, category: CategoryDto): Promise<void> => {
  const response = await httpClient.put('/categories/' + id, category);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const categoryService = { getAll, updateCategory, productsInCategory };

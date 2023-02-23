import { ProductDto } from 'dtos/ProductDto';
import { ProductRequestDto } from 'dtos/RequestDtos/ProductRequestDto';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<ProductDto[]> => {
  const response = await httpClient.get('/products');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const create = async (createDto: ProductRequestDto): Promise<ProductDto> => {
  const response = await httpClient.post('/products', createDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const edit = async (Id: number, UpdateDto: ProductRequestDto): Promise<ProductDto> => {
  const response = await httpClient.put(`/products/${Id}`, UpdateDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const remove = async (id: number): Promise<void> => {
  const response = await httpClient.remove('/products/' + id);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const productService = { getAll, create, edit, remove };

import { CategoryDto } from 'dtos/CategoryDto';
import { CategoryRequestDto } from 'dtos/CategoryRequestDto';
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
  const x = await response.json();
  await console.log(x);

  return x;
};

const create = async (createDto: CategoryRequestDto): Promise<CategoryDto> => {
  const response = await httpClient.post('/categories', createDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const edit = async (Id: number, UpdateDto: CategoryRequestDto): Promise<CategoryDto> => {
  const response = await httpClient.put(`/categories/${Id}`, UpdateDto);

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
  const response = await httpClient.remove('/categories/' + id);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const categoryService = { getAll, create, edit, remove };

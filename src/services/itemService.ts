import { ItemCreateDto } from 'dtos/ItemCreateDto';
import { ItemDto } from 'dtos/ItemDto';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<ItemDto[]> => {
  const response = await httpClient.get('/items/');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const create = async (createDto: ItemCreateDto): Promise<ItemDto> => {
  const response = await httpClient.post('/items', createDto);

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
  const response = await httpClient.remove('/items/' + id);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const itemService = { getAll, create, remove };

import { TagDto } from 'dtos/TagDto';
import { TagRequestDto } from 'dtos/TagRequestDto';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<TagDto[]> => {
  const response = await httpClient.get('/tags');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const create = async (createDto: TagRequestDto): Promise<TagDto> => {
  const response = await httpClient.post('/tags', createDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const edit = async (Id: number, UpdateDto: TagRequestDto): Promise<TagDto> => {
  const response = await httpClient.put(`/tags/${Id}`, UpdateDto);

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
  const response = await httpClient.remove('/tags/' + id);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const tagService = { getAll, create, edit, remove };

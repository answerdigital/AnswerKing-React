import { TagDto } from 'dtos/TagDto';
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

export const tagService = { getAll };

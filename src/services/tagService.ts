import { TagDto } from 'dtos/TagDto';
import { handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<TagDto[]> => {
    const response = await HttpClient.get('/tags');
    return handleResponse<TagDto[]>(response);
  },
};

import { TagDto } from 'dtos/TagDto';
import { TagRequestDto } from 'dtos/RequestDtos/TagRequestDto';
import { handleDeleteResponse, handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<TagDto[]> => {
    const response = await HttpClient.get('/tags');
    return handleResponse<TagDto[]>(response);
  },

  create: async (createDto: TagRequestDto): Promise<TagDto> => {
    const response = await HttpClient.post('/tags', createDto);
    return handleResponse<TagDto>(response);
  },

  edit: async (id: number, updateDto: TagRequestDto): Promise<TagDto> => {
    const response = await HttpClient.put(`/tags/${id}`, updateDto);
    return handleResponse<TagDto>(response);
  },

  retire: async (id: number): Promise<void> => {
    const response = await HttpClient.removeOrRetire(`/tags/${id}`);
    return handleDeleteResponse(response);
  },
};

import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { ProductDto } from 'dtos/ProductDto';
import { handleDeleteResponse, handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<ProductDto[]> => {
    const response = await HttpClient.get('/products');
    return handleResponse<ProductDto[]>(response);
  },

  create: async (createDto: CreatedProductDto): Promise<ProductDto> => {
    const response = await HttpClient.post('/products', createDto);
    return handleResponse<ProductDto>(response);
  },

  retire: async (id: number): Promise<void> => {
    const response = await HttpClient.removeOrRetire(`/products/${id}`);
    return handleDeleteResponse(response);
  },
};

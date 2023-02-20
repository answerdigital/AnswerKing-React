import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { OrderDto } from 'dtos/Order/OrderDto';
import { handleResponse } from 'utilities/HandleHttpResponses';
import HttpClient from 'utilities/HttpClient';

export default {
  getAll: async (): Promise<OrderDto[]> => {
    const response = await HttpClient.get('/orders');
    return handleResponse<OrderDto[]>(response);
  },

  getById: async (id: number): Promise<OrderDto> => {
    const response = await HttpClient.get(`/orders/${id}`);
    return handleResponse<OrderDto>(response);
  },

  create: async (createOrderDto: CreatedOrderDto): Promise<OrderDto> => {
    const response = await HttpClient.post('/orders', createOrderDto);
    return handleResponse<OrderDto>(response);
  },

  update: async (id: number, orderDto: CreatedOrderDto): Promise<OrderDto> => {
    const response = await HttpClient.put(`/orders/${id}`, orderDto);
    return handleResponse<OrderDto>(response);
  },

  remove: async (id: number): Promise<void> => {
    const response = await HttpClient.removeOrRetire(`/orders/${id}`);
    if (!response.ok) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
};

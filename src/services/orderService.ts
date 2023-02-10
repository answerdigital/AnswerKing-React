import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { OrderDto } from 'dtos/Order/OrderDto';
import { httpClient } from 'utilities/http-client';

export interface ProblemDetails {
  type: string;
  title: string;
  detail?: string;
  status: number;
  traceId: string;
  instance?: string;
}

const getAll = async (): Promise<OrderDto[]> => {
  const response = await httpClient.get('/orders');

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const getById = async (id: number): Promise<OrderDto> => {
  const response = await httpClient.get('/orders/' + id);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const create = async (createOrderDto: CreatedOrderDto): Promise<OrderDto> => {
  const response = await httpClient.post('/orders', createOrderDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const update = async (id: number, orderDto: CreatedOrderDto): Promise<OrderDto> => {
  const response = await httpClient.put(`/orders/${id}`, orderDto);

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
  const response = await httpClient.remove(`/orders/${id}`);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const orderService = { getAll, getById, create, update, remove };

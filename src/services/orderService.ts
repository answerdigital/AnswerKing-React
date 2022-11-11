import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { OrderDto } from 'dtos/OrderDto';
import { LineItemUpdateDto } from 'dtos/LineItemUpdateDto';
import { httpClient } from 'utilities/http-client';

export interface ProblemDetails {
  type: string;
  title: string;
  detail?: string;
  status: number;
  traceId: string;
  instance?: string;
}

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

const create = async (createOrderDto: OrderCreateDto): Promise<OrderDto> => {
  const response = await httpClient.post('/orders/', createOrderDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const addItem = async (orderId: number, itemId: number): Promise<void> => {
  const response = await httpClient.post(`/orders/${orderId}/items/${itemId}`, {});

  if (!response.ok) {
    return Promise.reject();
  }
};

const removeItem = async (orderId: number, itemId: number): Promise<void> => {
  const response = await httpClient.remove(`/orders/${orderId}/items/${itemId}`, {});

  if (!response.ok) {
    return Promise.reject();
  }
};

const updateOrderItem = async (orderId: number, itemId: number, updateDto: LineItemUpdateDto): Promise<void> => {
  const response = await httpClient.put(`/orders/${orderId}/items/${itemId}`, updateDto);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const orderService = { getById, create, addItem, removeItem, updateOrderItem };

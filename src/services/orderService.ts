import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { OrderDto } from 'dtos/OrderDto';
import { OrderItemUpdateDto } from 'dtos/OrderItemUpdateDto';
import { httpClient } from 'utilities/http-client';

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors: {
    [Key in keyof any]: string[];
  };
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

const create = async (createDto: OrderCreateDto): Promise<OrderDto> => {
  const response = await httpClient.post('/orders', createDto);

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

const updateOrderItem = async (orderId: number, itemId: number, updateDto: OrderItemUpdateDto): Promise<void> => {
  const response = await httpClient.put(`/orders/${orderId}/items/${itemId}`, updateDto);

  if (!response.ok) {
    return Promise.reject();
  }
};

export const orderService = { getById, create, addItem, removeItem, updateOrderItem };

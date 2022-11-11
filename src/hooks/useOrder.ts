import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { OrderDto } from 'dtos/OrderDto';
import { LineItemUpdateDto } from 'dtos/LineItemUpdateDto';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { orderService, ProblemDetails } from 'services/orderService';

type AddItemToOrderArgs = { orderId: number; itemId: number };
type RemoveItemFromOrderArgs = { orderId: number; itemId: number };
type UpdateOrderItemArgs = { orderId: number; itemId: number; updateDto: LineItemUpdateDto };

interface UseOrderResult {
  order: UseQueryResult<OrderDto>;
  getOrder: UseMutationResult<OrderDto, ProblemDetails, number>;
  createOrder: UseMutationResult<OrderDto, ProblemDetails, OrderCreateDto>;
  clearOrder(): void;
  addItemToOrder: UseMutationResult<void, void, AddItemToOrderArgs>;
  removeItemFromOrder: UseMutationResult<void, void, RemoveItemFromOrderArgs>;
  updateOrderItemQuantity: UseMutationResult<void, void, UpdateOrderItemArgs>;
}

export const useOrder = (): UseOrderResult => {
  const queryClient = useQueryClient();

  const order = useQuery<OrderDto>(['order'], { enabled: false });

  const getOrder = useMutation<OrderDto, ProblemDetails, number>((id) => orderService.getById(id), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const createOrder = useMutation<OrderDto, ProblemDetails, OrderCreateDto>(
    (orderCreateDto) => orderService.create(orderCreateDto),
    {
      onSuccess: (orderDto) => {
        queryClient.setQueryData(['order'], orderDto);
      },
    }
  );

  const clearOrder = (): Promise<void> => queryClient.resetQueries(['order']);

  const addItemToOrder = useMutation<void, void, AddItemToOrderArgs>(
    ({ itemId, orderId }) => orderService.addItem(orderId, itemId),
    {
      onSuccess: (_, { orderId }) => {
        getOrder.mutate(orderId);
      },
    }
  );

  const removeItemFromOrder = useMutation<void, void, RemoveItemFromOrderArgs>(
    ({ itemId, orderId }) => orderService.removeItem(orderId, itemId),
    {
      onSuccess: (_, { orderId }) => {
        getOrder.mutate(orderId);
      },
    }
  );

  const updateOrderItemQuantity = useMutation<void, void, UpdateOrderItemArgs>(
    ({ itemId, orderId, updateDto }) => orderService.updateOrderItem(orderId, itemId, updateDto),
    {
      onSuccess: (_, { orderId }) => {
        getOrder.mutate(orderId);
      },
    }
  );

  return { order, getOrder, createOrder, clearOrder, addItemToOrder, removeItemFromOrder, updateOrderItemQuantity };
};

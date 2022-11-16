import { ProductDto } from 'dtos/ProductDto';
import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { productService } from 'services/productService';
import { ProblemDetails } from 'services/orderService';

interface UseProductsResult {
  products: UseQueryResult<ProductDto[]>;
  createProduct: UseMutationResult<ProductDto, ProblemDetails, CreatedProductDto>;
  removeProduct: UseMutationResult<void, ProblemDetails, number>;
}

export const useProducts = (): UseProductsResult => {
  const products = useQuery<ProductDto[]>(['items'], productService.getAll);

  const createProduct = useMutation<ProductDto, ProblemDetails, CreatedProductDto>(
    (createDto) => productService.create(createDto),
    {
      onSuccess: () => {
        products.refetch();
      },
    }
  );

  const removeProduct = useMutation<void, ProblemDetails, number>((id) => productService.remove(id), {
    onSuccess: () => {
      products.refetch();
    },
  });

  return { products, createProduct, removeProduct };
};

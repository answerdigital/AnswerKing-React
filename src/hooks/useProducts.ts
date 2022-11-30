import { ProductDto } from 'dtos/ProductDto';
import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { productService } from 'services/productService';
import { ExtendedProblemDetails, ProblemDetails } from 'dtos/ProblemDetailsDto';

interface UseProductsResult {
  products: UseQueryResult<ProductDto[]>;
  createProduct: UseMutationResult<ProductDto, ExtendedProblemDetails, CreatedProductDto>;
  removeProduct: UseMutationResult<void, ProblemDetails, number>;
}

export const useProducts = (): UseProductsResult => {
  const products = useQuery<ProductDto[]>(['items'], productService.getAll);

  const createProduct = useMutation<ProductDto, ExtendedProblemDetails, CreatedProductDto>((createDto) => productService.create(createDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const removeProduct = useMutation<void, ExtendedProblemDetails, number>((id) => productService.remove(id), {
    onSuccess: () => {
      products.refetch();
    },
  });

  return { products, createProduct, removeProduct };
};

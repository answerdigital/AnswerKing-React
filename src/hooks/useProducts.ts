import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { ProductProblemDetails } from 'dtos/ProblemDetails';
import { ProductDto } from 'dtos/ProductDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import ProductService from 'services/productService';

interface UseProductsResult {
  products: UseQueryResult<ProductDto[]>;
  createProduct: UseMutationResult<ProductDto, ProductProblemDetails, CreatedProductDto>;
  removeProduct: UseMutationResult<void, ProductProblemDetails, number>;
}

export default function useProducts(filtered = false): UseProductsResult {
  const products = useQuery<ProductDto[]>(['items'], ProductService.getAll, {
    select: (data) => (filtered ? data.filter((product) => !product.retired || !product.category) : data),
  });

  const createProduct = useMutation<ProductDto, ProductProblemDetails, CreatedProductDto>((createDto) => ProductService.create(createDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const removeProduct = useMutation<void, ProductProblemDetails, number>((id) => ProductService.retire(id), {
    onSuccess: () => {
      products.refetch();
    },
  });

  return { products, createProduct, removeProduct };
}

import ProductDto from 'dtos/Product/ProductDto';
import ProductProblemDetails from 'dtos/Product/ProductProblemDetails';
import ProductRequestDto from 'dtos/Product/ProductRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import productService from 'services/productService';

interface UpdateProductProps {
  id: number;
  requestDto: ProductRequestDto;
}

interface UseProductsResult {
  products: UseQueryResult<ProductDto[]>;
  createProduct: UseMutationResult<ProductDto, ProductProblemDetails, ProductRequestDto>;
  editProduct: UseMutationResult<ProductDto, ProductProblemDetails, UpdateProductProps>;
  removeProduct: UseMutationResult<void, ProductProblemDetails, number>;
}

export default function useProducts(): UseProductsResult {
  const products = useQuery<ProductDto[]>(['products'], productService.getAll);

  const createProduct = useMutation<ProductDto, ProductProblemDetails, ProductRequestDto>((requestDto) => productService.create(requestDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const editProduct = useMutation<ProductDto, ProductProblemDetails, UpdateProductProps>((props) => productService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const removeProduct = useMutation<void, ProductProblemDetails, number>((id) => productService.retire(id), {
    onSuccess: () => {
      products.refetch();
    },
  });

  return { products, createProduct, editProduct, removeProduct };
}

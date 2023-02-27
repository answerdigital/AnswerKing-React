import { ProductDto } from 'dtos/ProductDto';
import { ProductRequestDto } from 'dtos/RequestDtos/ProductRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ProblemDetails, ItemService } from 'services/itemService';

interface UpdateProductProps {
  id: number;
  requestDto: ProductRequestDto;
}

export interface productProblemDetails extends ProblemDetails {
  errors: errors;
}

export interface errors {
  name: string[];
  price: string[];
  description: string[];
}

interface UseProductsResult {
  products: UseQueryResult<ProductDto[]>;
  createProduct: UseMutationResult<ProductDto, productProblemDetails, ProductRequestDto>;
  editProduct: UseMutationResult<ProductDto, productProblemDetails, UpdateProductProps>;
  removeProduct: UseMutationResult<void, ProblemDetails, number>;
}

export const useProducts = (): UseProductsResult => {
  const productService = new ItemService<ProductDto,ProductRequestDto>('products');

  const products = useQuery<ProductDto[]>(['items'], productService.getAll);

  const createProduct = useMutation<ProductDto, productProblemDetails, ProductRequestDto>((requestDto) => productService.create(requestDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const editProduct = useMutation<ProductDto, productProblemDetails, UpdateProductProps>((props) => productService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      products.refetch();
    },
  });

  const removeProduct = useMutation<void, productProblemDetails, number>((id) => productService.remove(id), {
    onSuccess: () => {
      products.refetch();
    },
  });

  return { products, createProduct, editProduct, removeProduct };
};

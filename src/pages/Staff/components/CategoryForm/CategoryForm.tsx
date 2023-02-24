import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFormContext } from './CategoryFormContext';
import { Button } from 'common/Buttons/Button';
import { Input } from 'common/Inputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from 'common/Inputs/TextArea';
import { Checkbox } from 'common/Inputs/Checkbox';
import { useProducts } from 'hooks/useProducts';
import { Label } from 'common/Inputs/Label';
import { categoryFormSchema, CategoryFormSchema } from 'schemas/CategoryFormSchema';
import { useCategories } from 'hooks/useCategories';
import { CategoryRequestDto } from 'dtos/RequestDtos/CategoryRequestDto';
import { toast } from 'react-toastify';
import { LoaderOverlay } from 'common/LoaderOverlay/LoaderOverlay';

export const CategoryForm = (): ReactElement => {
  const categoryForm = useCategoryFormContext();
  const { products } = useProducts();
  const { createCategory, editCategory } = useCategories();

  const productOptions = useMemo(() => {
    const activeProducts = products.data?.filter((product) => !product.retired) || [];
    return (
      activeProducts.map((product) => {
        return {
          product: product,
          initiallySelected: !!categoryForm.initialCategory?.products?.includes(product.id),
        };
      }) ?? []
    );
  }, [products.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormSchema>({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      name: categoryForm.initialCategory?.name ?? '',
      description: categoryForm.initialCategory?.description ?? '',
      products: productOptions.map<boolean>((option) => categoryForm.initialCategory?.products?.includes(option.product.id) as boolean),
    },
  });

  const submitForm = async (data: CategoryFormSchema): Promise<void> => {
    const legacyProductsIds =
      products.data
        ?.filter((product) => product.retired && categoryForm.initialCategory?.products?.includes(product.id))
        .map((product) => product.id) ?? [];
    const ActiveProductIds = productOptions.filter((option, i) => (data.products ? data.products[i] : false)).map((option) => option.product.id);

    const categpryOutput: CategoryRequestDto = { ...data, products: ActiveProductIds.concat(legacyProductsIds) };

    try {
      if (!categoryForm.initialCategory) {
        const returnCategory = await createCategory.mutateAsync(categpryOutput);
        toast.success(`Product "${returnCategory.name}" was succesfully added with ID:"${returnCategory.id}" .`);
      } else {
        const returnCategory = await editCategory.mutateAsync({ id: categoryForm.initialCategory.id, requestDto: categpryOutput });
        toast.success(`Product "${returnCategory.name}" was succesfully edited" .`);
      }
      categoryForm.closeForm();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const loading = products.isLoading;

  return (
    <>
      {!loading ? (
        <form className="w-full overflow-auto">
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input label="Category Name" id="category-name" error={errors.name?.message} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea
                label="Category Description"
                id="category-description"
                rows={3}
                error={errors.description?.message}
                {...register('description')}
              />
            </div>
            <Label className="col-span-4" error={errors.products?.message}>
              Products
            </Label>
            {productOptions.map((productOption) => {
              return (
                <Checkbox
                  key={productOption.product.id}
                  id={productOption.product.id.toString()}
                  label={productOption.product.name}
                  value={productOption.product.id}
                  defaultChecked={productOption.initiallySelected}
                  {...register(`products.${productOption.product.id}`)}
                  disabled={productOption.product.retired}
                />
              );
            })}
          </div>
        </form>
      ) : (
        <LoaderOverlay isEnabled={true} />
      )}
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" onClick={categoryForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" onClick={handleSubmit(submitForm)} disabled={loading}>
          Save Category
        </Button>
      </div>
    </>
  );
};

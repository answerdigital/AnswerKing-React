import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFormContext } from './CategoryFormContext';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from 'components/Inputs/TextArea';
import { Checkbox } from 'components/Inputs/Checkbox';
import { useProducts } from 'hooks/useProducts';
import { Label } from 'components/Inputs/Label';
import { categoryFormSchema, CategoryFormSchema } from 'schemas/CategoryFormSchema';
import { useCategories } from 'hooks/useCategories';
import { CategoryRequestDto } from 'dtos/CategoryRequestDto';

export const CategoryForm = (): ReactElement => {
  const categoryForm = useCategoryFormContext();
  const { products } = useProducts();
  const { createCategory, editCategory } = useCategories();
  const retiredProducts = useMemo(() => {
    return products.data?.filter((product) => product.retired) || [];
  }, [products.data]);
  const activeProducts = useMemo(() => {
    return products.data?.filter((product) => !product.retired) || [];
  }, [products.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormSchema>({
    resolver: yupResolver(categoryFormSchema),
    defaultValues: {
      name: categoryForm.initialCategory?.name,
      description: categoryForm.initialCategory?.description,
      products: categoryForm.initialCategory?.products,
    },
  });

  const submitForm = (data: CategoryFormSchema): void => {
    const legacyProducts = retiredProducts.filter((product) => categoryForm.initialCategory?.products?.includes(product.id));
    const legacyProductsIds = legacyProducts.map((product) => product.id);
    const tagOutput: CategoryRequestDto = { ...data, products: (data.products as number[]).concat(legacyProductsIds) };
    console.log(tagOutput);
    if (!categoryForm.initialCategory) {
      createCategory.mutate(tagOutput, {
        onSuccess: (returnProduct) => {
          console.log(`Product "${returnProduct.name}" was succesfully added with ID:"${returnProduct.id}" .`);
          categoryForm.closeForm();
        },
      });
    } else {
      editCategory.mutate(
        { id: categoryForm.initialCategory.id, requestDto: tagOutput },
        {
          onSuccess: (returnProduct) => {
            console.log(`Product "${returnProduct.name}" was succesfully edited" .`);
            categoryForm.closeForm();
          },
        }
      );
    }
  };

  return (
    <>
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
          {activeProducts.map((product) => {
            return <Checkbox key={product.id} id={product.id.toString()} label={product.name} value={product.id} {...register('products')} />;
          })}
        </div>
      </form>
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" onClick={categoryForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" onClick={handleSubmit(submitForm)}>
          Save Category
        </Button>
      </div>
    </>
  );
};

import { ReactElement, useMemo } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common/Buttons/Button';
import Checkbox from 'common/Inputs/Checkbox';
import Input from 'common/Inputs/Input';
import Label from 'common/Inputs/Label';
import Select from 'common/Inputs/Select';
import TextArea from 'common/Inputs/TextArea';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import { CategoryDto } from 'dtos/CategoryDto';
import { TagDto } from 'dtos/TagDto';
import useCategories from 'hooks/useCategories';
import useTags from 'hooks/useTags';
import { useForm } from 'react-hook-form';
import { ProductFormSchema, productFormSchema } from 'schemas/ProductFormSchema';
import { useProductFormContext } from './ProductFormContext';

export default function ProductForm(): ReactElement {
  const productForm = useProductFormContext();
  const { tags } = useTags();
  const { categories } = useCategories(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormSchema>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      name: productForm.initialProduct?.name,
      desc: productForm.initialProduct?.description,
      price: productForm.initialProduct?.price,
      stock: 0,
      category: productForm.initialProduct?.category?.id.toString(),
      tags: productForm.initialProduct?.tags ?? [],
    },
  });

  const categoryOptions = useMemo(
    () =>
      categories.data?.map((category: CategoryDto) => ({
        label: category.name ?? '',
        value: category.id.toString(),
      })) ?? [],
    [categories.data]
  );

  const submitForm = (data: ProductFormSchema): void => {
    console.log(data);
  };

  return (
    <div>
      {!tags.isLoading && !categories.isLoading && (
        <>
          <form className="w-full overflow-auto">
            <div className="grid grid-cols-4 gap-4 p-2">
              <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div className="col-span-2">
                <Input type="text" label="Item name" id="item-name" error={errors.name?.message} {...register('name')} />
              </div>
              <div className="col-span-2 row-span-2">
                <TextArea label="Item description" id="item-description" error={errors.desc?.message} {...register('desc')} />
              </div>
              <div className="col-span-2">
                <Select label="Category" options={categoryOptions} id="category" error={errors.category?.message} {...register('category')} />
              </div>
              <div className="flex w-full flex-col">
                <Input label="Price" type="number" step={0.01} min={0} id="price" error={errors.price?.message} {...register('price')} />
              </div>
              <div className="flex w-full flex-col">
                <Input label="Stock" type="number" step={1} min={0} id="stock" error={errors.stock?.message} {...register('stock')} />
              </div>
              <Label error={errors.tags?.message} className="col-span-4">
                Tags
              </Label>
              {tags.data?.map((tag: TagDto) => (
                <Checkbox key={tag.id} value={tag.id} label={tag.name} id={tag.id.toString()} {...register('tags')} />
              ))}
            </div>
            <LoaderOverlay isEnabled={false} />
          </form>

          <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
            <Button colour="white" onClick={productForm.closeForm}>
              Cancel
            </Button>
            <Button colour="yellow" onClick={handleSubmit(submitForm)} data-testid="submit-product">
              Save Item
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

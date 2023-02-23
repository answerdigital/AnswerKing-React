import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Buttons/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from 'components/Inputs/Select';
import { Input } from 'components/Inputs/Input';
import { TextArea } from 'components/Inputs/TextArea';
import { Checkbox } from 'components/Inputs/Checkbox';
import { useProductFormContext } from './ProductFormContext';
import { useCategories } from 'hooks/useCategories';
import { useTags } from 'hooks/useTags';
import { Label } from 'components/Inputs/Label';
import { ProductFormSchema, productFormSchema } from 'schemas/ProductFormSchema';
import { ProductRequestDto } from 'dtos/RequestDtos/ProductRequestDto';
import { useProducts } from 'hooks/useProducts';
import { toast } from 'react-toastify';

export const ProductForm = (): ReactElement => {
  const productForm = useProductFormContext();
  const { tags } = useTags();
  const { categories } = useCategories();
  const { createProduct, editProduct } = useProducts();

  const tagOptions = useMemo(() => {
    const activeTags = tags.data?.filter((tag) => !tag.retired) || [];
    return (
      activeTags.map((tag) => {
        return {
          tag: tag,
          selected: productForm.initialProduct?.tags.includes(tag.id) as boolean,
        };
      }) ?? []
    );
  }, [categories.data]);

  const activeCategories = useMemo(() => {
    return categories.data?.filter((category) => !category.retired) || [];
  }, [categories.data]);

  const activeDefaultCategory = useMemo(() => {
    return activeCategories.find((category) => category.id === productForm.initialProduct?.category?.id);
  }, [activeCategories]);

  const defaultCategoryisRetired = useMemo(() => {
    return !activeDefaultCategory && productForm.initialProduct !== undefined;
  }, [activeDefaultCategory, productForm.initialProduct]);

  const categoryOptions = useMemo(() => {
    return (
      activeCategories.map((category) => {
        return {
          label: category.name ?? '',
          value: category.id.toString(),
        };
      }) ?? []
    );
  }, [activeCategories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormSchema>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      name: productForm.initialProduct?.name,
      description: productForm.initialProduct?.description,
      price: productForm.initialProduct?.price,
      stock: 0,
      categoryId: activeDefaultCategory?.id,
      tagsIds: productForm.initialProduct?.tags,
    },
  });

  const submitForm = async (data: ProductFormSchema): Promise<void> => {
    const legacyTagIds = tags.data?.filter((tag) => tag.retired && productForm.initialProduct?.tags.includes(tag.id)).map((tag) => tag.id) || [];

    const categoryIdToSave = defaultCategoryisRetired ? productForm.initialProduct?.category?.id || activeCategories[0]?.id : data.categoryId;

    const productOutput: ProductRequestDto = { ...data, categoryId: categoryIdToSave, tagsIds: (data.tagsIds as number[]).concat(legacyTagIds) };

    try {
      if (!productForm.initialProduct) {
        const returnProduct = await createProduct.mutateAsync(productOutput);
        toast.success(`Product "${returnProduct.name}" was succesfully added with ID:"${returnProduct.id}" .`);
      } else {
        const returnProduct = await editProduct.mutateAsync({ id: productForm.initialProduct?.id, requestDto: productOutput });
        toast.success(`Product "${returnProduct.name}" was succesfully edited" .`);
      }
      productForm.closeForm();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const loading = tags.isLoading || categories.isLoading;

  return (
    <>
      {!loading ? (
        <form className="w-full overflow-auto">
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input type="text" label="Item name" id="item-name" error={errors.name?.message} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Item description" id="item-description" error={errors.description?.message} {...register('description')} />
            </div>
            <div className="col-span-2">
              <Select
                {...register('categoryId')}
                label="Category"
                options={categoryOptions}
                id="category"
                error={errors.categoryId?.message}
                disabled={defaultCategoryisRetired}
              />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Price" type="number" step={0.01} min={0} id="price" error={errors.price?.message} {...register('price')} />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Stock" type="number" step={1} min={0} id="stock" error={errors.stock?.message} {...register('stock')} />
            </div>
            <Label error={errors.tagsIds?.message} className="col-span-4">
              Tags
            </Label>
            {tagOptions.map((tagOption) => {
              return (
                <Checkbox
                  {...register(`tagsIds.${tagOption.tag.id}`)}
                  key={tagOption.tag.id}
                  value={tagOption.tag.id}
                  label={tagOption.tag.name}
                  id={tagOption.tag.id.toString()}
                  defaultChecked={tagOption.selected}
                  disabled={tagOption.tag.retired}
                />
              );
            })}
          </div>
        </form>
      ) : (
        <LoaderOverlay isEnabled={true} />
      )}
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" onClick={productForm.closeForm}>
          Cancel
        </Button>
        <Button colour={loading ? 'grey' : 'yellow'} onClick={handleSubmit(submitForm)} data-testid="submit-product" disabled={loading}>
          Save Item
        </Button>
      </div>
    </>
  );
};

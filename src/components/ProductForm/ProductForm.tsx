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
import { ProductRequestDto } from 'dtos/ProductRequestDto';
import { useProducts } from 'hooks/useProducts';

export const ProductForm = (): ReactElement => {
  const productForm = useProductFormContext();
  const { tags } = useTags();
  const { categories } = useCategories();
  const { createProduct, editProduct } = useProducts();

  const activeTags = useMemo(() => {
    return tags.data?.filter((tag) => !tag.retired) || [];
  }, [tags.data]);

  const activeDefaultTags = useMemo(() => {
    return activeTags.filter((tag) => productForm.initialProduct?.tags.includes(tag.id));
  }, [tags.data]);

  const activeCategories = useMemo(() => {
    return categories.data?.filter((category) => !category.retired) || [];
  }, [categories.data]);

  const activeDefaultCategory = useMemo(() => {
    return activeCategories.find((category) => category.id === productForm.initialProduct?.category?.id);
  }, [categories.data]);

  const retiredDefaultCategory: boolean = useMemo(() => {
    return !activeDefaultCategory && productForm.initialProduct !== undefined;
  }, [categories.data]);

  const categoryOptions = useMemo(() => {
    return (
      activeCategories.map((category) => {
        return {
          label: category.name ?? '',
          value: category.id.toString(),
        };
      }) ?? []
    );
  }, [categories.data]);

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
      tagsIds: activeDefaultTags.map((tag) => tag.id),
    },
  });

  const submitForm = (data: ProductFormSchema): void => {
    const legacyTagIds =
      tags.data?.filter((product) => product.retired && productForm.initialProduct?.tags.includes(product.id)).map((product) => product.id) || [];
    const categoryIdToSave = retiredDefaultCategory ? data.categoryId : productForm.initialProduct?.category?.id;
    console.log(data);
    const productOutput: ProductRequestDto = { ...data, categoryId: categoryIdToSave, tagsIds: (data.tagsIds as number[]).concat(legacyTagIds) };
    console.log(productOutput);
    if (!productForm.initialProduct) {
      createProduct.mutate(productOutput, {
        onSuccess: (returnProduct) => {
          console.log(`Product "${returnProduct.name}" was succesfully added with ID:"${returnProduct.id}" .`);
          productForm.closeForm();
        },
      });
    } else {
      editProduct.mutate(
        { id: productForm.initialProduct.id, requestDto: productOutput },
        {
          onSuccess: (returnProduct) => {
            console.log(`Product "${returnProduct.name}" was succesfully edited" .`);
            productForm.closeForm();
          },
        }
      );
    }
  };

  const loading = tags.isLoading || categories.isLoading;

  return (
    <>
      {loading && (
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
                label="Category"
                options={categoryOptions}
                id="category"
                error={errors.categoryId?.message}
                {...register('categoryId')}
                disabled={retiredDefaultCategory}
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
            {activeTags.map((tag) => {
              return <Checkbox key={tag.id} value={tag.id} label={tag.name} id={tag.id.toString()} {...register('tagsIds')} />;
            })}
          </div>
          <LoaderOverlay isEnabled={false} />
        </form>
      )}
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" onClick={productForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" onClick={handleSubmit(submitForm)} data-testid="submit-product" disabled={loading}>
          Save Item
        </Button>
      </div>
    </>
  );
};

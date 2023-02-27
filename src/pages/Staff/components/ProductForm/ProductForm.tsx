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
import useCategories from 'hooks/useCategories';
import useTags from 'hooks/useTags';
import { useForm } from 'react-hook-form';
import { ProductFormSchema, productFormSchema } from 'schemas/ProductFormSchema';
import ProductRequestDto from 'dtos/Product/ProductRequestDto';
import useProducts from 'hooks/useProducts';
import { toast } from 'react-toastify';
import { useProductFormContext } from './ProductFormContext';

export default function ProductForm(): ReactElement {
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
          initiallySelected: productForm.initialProduct?.tags.includes(tag.id) as boolean,
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

  const { register, handleSubmit, formState } = useForm<ProductFormSchema>({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      name: productForm.initialProduct?.name ?? '',
      description: productForm.initialProduct?.description ?? '',
      price: productForm.initialProduct?.price ?? 0,
      categoryId: activeDefaultCategory?.id ?? 1,
      tagsIds: tagOptions.map<boolean>((option) => productForm.initialProduct?.tags.includes(option.tag.id) ?? false),
      stock: 0,
    },
  });

  const submitForm = async (data: ProductFormSchema): Promise<void> => {
    const legacyTagIds = tags.data?.filter((tag) => tag.retired && productForm.initialProduct?.tags.includes(tag.id)).map((tag) => tag.id) ?? [];
    const ActiveTagIds = tagOptions.filter((option, i) => (data.tagsIds ? data.tagsIds[i] : false)).map((option) => option.tag.id);

    const categoryIdToSave = defaultCategoryisRetired ? productForm.initialProduct?.category?.id ?? activeCategories[0]?.id : data.categoryId;

    const productOutput: ProductRequestDto = {
      ...data,
      categoryId: categoryIdToSave,
      tagsIds: ActiveTagIds.concat(legacyTagIds),
    };

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
              <Input type="text" label="Item name" id="item-name" error={formState.errors.name?.message} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Item description" id="item-description" error={formState.errors.description?.message} {...register('description')} />
            </div>
            <div className="col-span-2">
              <Select
                {...register('categoryId')}
                label="Category"
                options={categoryOptions}
                id="category"
                error={formState.errors.categoryId?.message}
                disabled={defaultCategoryisRetired}
              />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Price" type="number" step={0.01} min={0} id="price" error={formState.errors.price?.message} {...register('price')} />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Stock" type="number" step={1} min={0} id="stock" error={formState.errors.stock?.message} {...register('stock')} />
            </div>
            <Label error={formState.errors.tagsIds?.message} className="col-span-4">
              Tags
            </Label>
            {tagOptions.map((tagOption) => {
              return (
                <Checkbox
                  {...register(`tagsIds.${tagOption.tag.id}`)}
                  key={tagOption.tag.id}
                  label={tagOption.tag.name}
                  id={tagOption.tag.id.toString()}
                  defaultChecked={tagOption.initiallySelected}
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
}

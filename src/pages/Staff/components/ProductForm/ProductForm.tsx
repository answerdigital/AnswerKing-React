import { ReactElement, useEffect, useMemo, useState } from 'react';
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
import { ProductProblemDetails } from 'dtos/Product/ProductProblemDetails';
import { ProductRequestDto } from 'dtos/Product/ProductRequestDto';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import useTags from 'hooks/useTags';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProductFormSchema, productFormSchema } from 'schemas/ProductFormSchema';
import { useProductFormContext } from './ProductFormContext';

export default function ProductForm(): ReactElement {
  const productForm = useProductFormContext();
  const { tags } = useTags(true);
  const { categories } = useCategories(true);
  const { createProduct, editProduct } = useProducts();

  const tagOptions = useMemo(
    () =>
      tags.data?.map((tag) => ({
        tag,
        initiallySelected: productForm.initialProduct?.tags.includes(tag.id) as boolean,
      })) ?? [],
    [categories.data]
  );

  const activeDefaultCategory = useMemo(
    () => categories.data?.find((category) => category.id === productForm.initialProduct?.category?.id),
    [categories.data]
  );

  const defaultRetiredCategory = useMemo(
    () => (activeDefaultCategory ? productForm.initialProduct : undefined),
    [activeDefaultCategory, productForm.initialProduct]
  );

  const categoryOptions = useMemo(
    () =>
      categories.data?.map((category) => ({
        label: category.name ?? '',
        value: category.id.toString(),
      })) ?? [],
    [categories.data]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormSchema>({
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

  const [nameErrors, setNameErrors] = useState<string>('');
  const [descriptionErrors, setDescriptionErrors] = useState<string>('');
  const [priceErrors, setPriceErrors] = useState<string>('');
  const [stockErrors, setStockErrors] = useState<string>('');
  const [categoryErrors, setCategoryErrors] = useState<string>('');
  const [tagsErrors, setTagsErrors] = useState<string>('');

  useEffect(() => {
    setNameErrors(errors.name?.message ?? '');
    setDescriptionErrors(errors.description?.message ?? '');
    setPriceErrors(errors.price?.message ?? '');
    setStockErrors(errors.stock?.message ?? '');
    setCategoryErrors(errors.categoryId?.message ?? '');
    setTagsErrors(errors.tagsIds?.message ?? '');
  }, [errors]);

  const displayErrors = (BackendProblems: ProductProblemDetails): void => {
    if (BackendProblems.errors.name) {
      setNameErrors(String(BackendProblems.errors.name));
    }
    if (BackendProblems.errors.description) {
      setDescriptionErrors(String(BackendProblems.errors.description));
    }
    if (BackendProblems.errors.price) {
      setPriceErrors(String(BackendProblems.errors.price));
    }
    if (BackendProblems.errors.stock) {
      setNameErrors(String(BackendProblems.errors.stock));
    }
    if (BackendProblems.errors.categoryId) {
      setDescriptionErrors(String(BackendProblems.errors.categoryId));
    }
    if (BackendProblems.errors.tagsIds) {
      setPriceErrors(String(BackendProblems.errors.tagsIds));
    }
    if (BackendProblems.errors.product) {
      toast.error(String(BackendProblems.errors.product));
    }
  };

  const submitForm = async (formData: ProductFormSchema): Promise<void> => {
    const legacyTagIds = tags.data?.filter((tag) => tag.retired && productForm.initialProduct?.tags.includes(tag.id)).map((tag) => tag.id) ?? [];
    const selectedTagIds = tagOptions.filter((option, i) => (formData.tagsIds ? formData.tagsIds[i] : false)).map((option) => option.tag.id);

    const categoryIdToSave = defaultRetiredCategory?.id ?? formData.categoryId;

    const productOutput: ProductRequestDto = {
      ...formData,
      categoryId: categoryIdToSave,
      tagsIds: selectedTagIds.concat(legacyTagIds),
    };

    if (!productForm.initialProduct) {
      createProduct.mutate(productOutput, {
        onSuccess: (data) => {
          toast.success(`${data.name} has been successfully added with an id of ${data.id}`);
          productForm.closeForm();
        },
        onError: displayErrors,
      });
    } else {
      editProduct.mutate(
        { id: productForm.initialProduct.id, requestDto: productOutput },
        {
          onSuccess: (data) => {
            toast.success(`${data.name} has been successfully updated.`);
            productForm.closeForm();
          },
          onError: displayErrors,
        }
      );
    }
  };

  const loading = tags.isLoading || categories.isLoading;

  return (
    <>
      {!loading ? (
        <form className="w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input type="text" label="Item name" id="item-name" error={nameErrors} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Item description" id="item-description" error={descriptionErrors} {...register('description')} />
            </div>
            <div className="col-span-2">
              <Select
                {...register('categoryId')}
                label="Category"
                options={categoryOptions}
                id="category"
                error={categoryErrors}
                disabled={defaultRetiredCategory !== undefined}
              />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Price" type="number" step={0.01} min={0} id="price" error={priceErrors} {...register('price')} />
            </div>
            <div className="flex w-full flex-col">
              <Input label="Stock" type="number" step={1} min={0} id="stock" error={stockErrors} {...register('stock')} />
            </div>
            <Label error={tagsErrors} className="col-span-4">
              Tags
            </Label>
            {tagOptions.map((tagOption) => (
              <Checkbox
                {...register(`tagsIds.${tagOption.tag.id}`)}
                key={tagOption.tag.id}
                label={tagOption.tag.name}
                id={tagOption.tag.id.toString()}
                defaultChecked={tagOption.initiallySelected}
                disabled={tagOption.tag.retired}
              />
            ))}
          </div>
        </form>
      ) : (
        <LoaderOverlay isEnabled />
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

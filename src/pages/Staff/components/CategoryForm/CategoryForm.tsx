import { ReactElement, useEffect, useMemo, useState } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common/Buttons/Button';
import Checkbox from 'common/Inputs/Checkbox';
import Input from 'common/Inputs/Input';
import Label from 'common/Inputs/Label';
import TextArea from 'common/Inputs/TextArea';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import CategoryProblemDetails from 'dtos/Category/CategoryProblemDetails';
import CategoryRequestDto from 'dtos/Category/CategoryRequestDto';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { categoryFormSchema, CategoryFormSchema } from 'schemas/CategoryFormSchema';
import { useCategoryFormContext } from './CategoryFormContext';

export default function CategoryForm(): ReactElement {
  const categoryForm = useCategoryFormContext();
  const allProducts = useProducts(false).products;
  const activeProducts = useProducts(true).products;
  const { createCategory, editCategory } = useCategories();

  const productOptions = useMemo(
    () =>
      activeProducts.data?.map((product) => ({
        product,
        initiallySelected: !!categoryForm.initialCategory?.products?.includes(product.id),
      })) ?? [],
    [activeProducts.data]
  );

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

  const [nameErrors, setNameErrors] = useState<string>('');
  const [descriptionErrors, setDescriptionErrors] = useState<string>('');
  const [productsErrors, setProductsErrors] = useState<string>('');

  useEffect(() => {
    setNameErrors(errors.name?.message ?? '');
    setDescriptionErrors(errors.description?.message ?? '');
    setProductsErrors(errors.products?.message ?? '');
  }, [errors]);

  const displayErrors = (BackendProblems: CategoryProblemDetails): void => {
    if (BackendProblems.errors.name) {
      setNameErrors(String(BackendProblems.errors.name));
    }
    if (BackendProblems.errors.products) {
      setProductsErrors(String(BackendProblems.errors.products));
    }
    if (BackendProblems.errors.description) {
      setDescriptionErrors(String(BackendProblems.errors.description));
    }
    if (BackendProblems.errors.category) {
      toast.error(String(BackendProblems.errors.category));
    }
  };

  const submitForm = async (formData: CategoryFormSchema): Promise<void> => {
    const legacyProductsIds =
      allProducts.data
        ?.filter((product) => product.retired && categoryForm.initialCategory?.products?.includes(product.id))
        .map((product) => product.id) ?? [];

    const selectedProductIds = productOptions
      .filter((option, i) => (formData.products ? formData.products[i] : false))
      .map((option) => option.product.id);

    const categoryOutput: CategoryRequestDto = { ...formData, products: selectedProductIds.concat(legacyProductsIds) };

    if (!categoryForm.initialCategory) {
      createCategory.mutate(categoryOutput, {
        onSuccess: (data) => {
          toast.success(`${data.name} has been successfully added with an id of ${data.id}`);
          categoryForm.closeForm();
        },
        onError: displayErrors,
      });
    } else {
      editCategory.mutate(
        { id: categoryForm.initialCategory.id, requestDto: categoryOutput },
        {
          onSuccess: (data) => {
            toast.success(`${data.name} has been successfully updated.`);
            categoryForm.closeForm();
          },
          onError: displayErrors,
        }
      );
    }
  };

  const loading = activeProducts.isLoading || allProducts.isLoading;

  return (
    <>
      {!loading ? (
        <form className="w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input label="Category Name" id="category-name" error={nameErrors} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Category Description" id="category-description" rows={3} error={descriptionErrors} {...register('description')} />
            </div>
            <Label className="col-span-4" error={productsErrors}>
              Products
            </Label>
            {productOptions.map((productOption) => (
              <Checkbox
                key={productOption.product.id}
                id={productOption.product.id.toString()}
                label={productOption.product.name}
                value={productOption.product.id}
                defaultChecked={productOption.initiallySelected}
                {...register(`products.${productOption.product.id}`)}
                disabled={productOption.product.retired}
              />
            ))}
          </div>
        </form>
      ) : (
        <LoaderOverlay isEnabled />
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
}

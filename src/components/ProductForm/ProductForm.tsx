import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Buttons/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from 'components/Inputs/Select';
import { Input } from 'components/Inputs/Input';
import { TextArea } from 'components/Inputs/TextArea';
import { Checkbox } from 'components/Inputs/Checkbox';
import { useProductFormContext } from './ProductFormContext';
import { useCategories } from 'hooks/useCategories';
import { useTags } from 'hooks/useTags';
import { Label } from 'components/Inputs/Label';
import { useProducts } from 'hooks/useProducts';
import { ProductRequestDto } from 'dtos/ProductRequestDto';

const formSchema = yup.object({
  name: yup.string().required('Name is required').max(120, 'Name cannot be longer than 120 characters'),
  description: yup.string().required('Description is required').max(500, 'Description cannot be longer than 500 characters'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
  categoryId: yup.number().required('Category is required'),
  stock: yup.number().required('Stock number is required').min(0).integer(),
  tagsIds: yup.array().of(yup.number().required()).required('Tag is required').min(1, 'At least one tag is required'),
});

type FormSchema = yup.InferType<typeof formSchema>;

export const ProductForm = (): ReactElement => {
  const productForm = useProductFormContext();
  const { createProduct, editProduct } = useProducts();
  const { tags } = useTags();
  const { categories } = useCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: productForm.initialProduct?.name,
      description: productForm.initialProduct?.description,
      price: productForm.initialProduct?.price,
      stock: 0,
      categoryId: productForm.initialProduct?.category?.id,
      tagsIds: productForm.initialProduct?.tags ?? [],
    },
  });

  const categoryOptions = useMemo(() => {
    return (
      categories.data?.map((category) => {
        return {
          label: category.name ?? '',
          value: category.id,
        };
      }) ?? []
    );
  }, [categories.data]);

  const submitForm = (data: FormSchema): void => {
    const productOutput: ProductRequestDto = data;
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

  return (
    <>
      <form className="w-full overflow-auto">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-2 row-span-3 flex h-full w-full items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="col-span-2">
            <Input type="text" label="Item name" id="item-name" error={errors.name?.message} {...register('name')} />
          </div>
          <div className="col-span-2 row-span-2">
            <TextArea label="Item description" id="item-description" error={errors.description?.message} {...register('description')} />
          </div>
          <div className="col-span-2">
            <Select label="Category" options={categoryOptions} id="category" error={errors.categoryId?.message} {...register('categoryId')} />
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
          {tags.data?.map((tag) => {
            return <Checkbox key={tag.id} value={tag.id} label={tag.name} id={tag.id.toString()} {...register('tagsIds')} />;
          })}
        </div>
        <LoaderOverlay isEnabled={false} />
      </form>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" size="medium" onClick={productForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={handleSubmit(submitForm)} data-testid="submit-product">
          Save Item
        </Button>
      </div>
    </>
  );
};

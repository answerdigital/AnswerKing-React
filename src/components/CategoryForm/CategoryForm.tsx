import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFormContext } from './CategoryFormContext';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from 'components/Inputs/TextArea';
import { Checkbox } from 'components/Inputs/Checkbox';
import { useProducts } from 'hooks/useProducts';
import { Label } from 'components/Inputs/Label';

const formSchema = yup.object({
  name: yup.string().required('Category name is required'),
  desc: yup.string().optional(),
  products: yup.array().of(yup.number()).optional(),
});

type FormSchema = yup.InferType<typeof formSchema>;

export const CategoryForm = (): ReactElement => {
  const categoryForm = useCategoryFormContext();
  const { products } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: categoryForm.initialCategory?.name,
      desc: categoryForm.initialCategory?.description,
      products: categoryForm.initialCategory?.products ?? [],
    },
  });

  const submitForm = (data: FormSchema): void => {
    console.log(data);
  };

  const filteredProducts = useMemo(() => {
    return products.data?.filter((product) => !product.retired);
  }, [products.data]);

  return (
    <>
      <form className="w-full overflow-auto">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="col-span-2 row-span-3 flex h-full w-full items-center justify-center bg-gray-200">
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div className="col-span-2">
            <Input label="Category Name" id="category-name" error={errors.name?.message} {...register('name')} />
          </div>
          <div className="col-span-2 row-span-2">
            <TextArea label="Category Description" id="category-description" rows={3} error={errors.desc?.message} {...register('desc')} />
          </div>
          <Label className="col-span-4" error={errors.products?.message}>
            Products
          </Label>
          {filteredProducts?.map((product) => {
            return <Checkbox key={product.id} id={product.id.toString()} label={product.name} value={product.id} {...register('products')} />;
          })}
        </div>
      </form>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" size="medium" onClick={categoryForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={handleSubmit(submitForm)}>
          Save Category
        </Button>
      </div>
    </>
  );
};

import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useTagFormContext } from './TagFormContext';
import { Button } from 'components/Buttons/Button';
import * as yup from 'yup';
import { Input } from 'components/Inputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from 'components/Inputs/TextArea';
import { useProducts } from 'hooks/useProducts';
import { Checkbox } from 'components/Inputs/Checkbox';
import { Label } from 'components/Inputs/Label';

const formSchema = yup.object({
  name: yup.string().required('Tag name is required'),
  desc: yup.string().optional(),
  products: yup.array().of(yup.number()).optional(),
});

type FormSchema = yup.InferType<typeof formSchema>;

export const TagForm = (): ReactElement => {
  const tagForm = useTagFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: tagForm.initialTag?.name,
      desc: tagForm.initialTag?.description,
      products: tagForm.initialTag?.products ?? [],
    },
  });
  const { products } = useProducts();

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
            <Input label="Tag Name" id="tag-name" error={errors.name?.message} {...register('name')} />
          </div>
          <div className="col-span-2 row-span-2">
            <TextArea label="Text Description" id="text-description" rows={3} error={errors.desc?.message} {...register('desc')} />
          </div>
          <Label className="col-span-4" error={errors.products?.message}>
            Products
          </Label>
          {filteredProducts?.map((product) => {
            return <Checkbox key={product.id} value={product.id} label={product.name} id={product.id.toString()} {...register('products')} />;
          })}
        </div>
        <LoaderOverlay isEnabled={false} />
      </form>
      <div className="mt-4 grid h-10 w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" size="medium" onClick={tagForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" size="medium" onClick={handleSubmit(submitForm)}>
          Save Tag
        </Button>
      </div>
    </>
  );
};

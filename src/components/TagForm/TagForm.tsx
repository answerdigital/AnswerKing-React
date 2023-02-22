import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { ReactElement, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useTagFormContext } from './TagFormContext';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from 'components/Inputs/TextArea';
import { useProducts } from 'hooks/useProducts';
import { Checkbox } from 'components/Inputs/Checkbox';
import { Label } from 'components/Inputs/Label';
import { tagsFormSchema, TagsFormSchema } from 'schemas/TagsFormSchema';
import { TagRequestDto } from 'dtos/TagRequestDto';
import { useTags } from 'hooks/useTags';

export const TagForm = (): ReactElement => {
  const tagForm = useTagFormContext();
  const { products } = useProducts();
  const { createTag, editTag } = useTags();

  const activeProducts = useMemo(() => {
    return products.data?.filter((product) => !product.retired) || [];
  }, [products.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagsFormSchema>({
    resolver: yupResolver(tagsFormSchema),
    defaultValues: {
      name: tagForm.initialTag?.name,
      description: tagForm.initialTag?.description,
      products: tagForm.initialTag?.products ?? [],
    },
  });

  const submitForm = (data: TagsFormSchema): void => {
    const legacyProductsIds =
      products.data?.filter((product) => product.retired && tagForm.initialTag?.products?.includes(product.id)).map((product) => product.id) || [];
    const tagOutput: TagRequestDto = { ...data, products: (data.products as number[]).concat(legacyProductsIds) };
    console.log(tagOutput);
    if (!tagForm.initialTag) {
      createTag.mutate(tagOutput, {
        onSuccess: (returnProduct) => {
          console.log(`Product "${returnProduct.name}" was succesfully added with ID:"${returnProduct.id}" .`);
          tagForm.closeForm();
        },
      });
    } else {
      editTag.mutate(
        { id: tagForm.initialTag.id, requestDto: tagOutput },
        {
          onSuccess: (returnProduct) => {
            console.log(`Product "${returnProduct.name}" was succesfully edited" .`);
            tagForm.closeForm();
          },
        }
      );
    }
  };

  const loading = products.isLoading;

  return (
    <>
      {!loading && (
        <form className="w-full overflow-auto">
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input label="Tag Name" id="tag-name" error={errors.name?.message} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Text Description" id="text-description" rows={3} error={errors.description?.message} {...register('description')} />
            </div>
            <Label className="col-span-4" error={errors.products?.message}>
              Products
            </Label>
            {activeProducts.map((product) => {
              return <Checkbox key={product.id} value={product.id} label={product.name} id={product.id.toString()} {...register('products')} />;
            })}
          </div>
          <LoaderOverlay isEnabled={false} />
        </form>
      )}
      <div className="mt-4 grid h-[45px] w-full flex-none grid-cols-2 gap-4">
        <Button colour="white" onClick={tagForm.closeForm}>
          Cancel
        </Button>
        <Button colour="yellow" onClick={handleSubmit(submitForm)} disabled={loading}>
          Save Tag
        </Button>
      </div>
    </>
  );
};

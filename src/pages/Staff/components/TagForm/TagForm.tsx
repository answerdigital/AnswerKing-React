import { ReactElement, useMemo } from 'react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common/Buttons/Button';
import Checkbox from 'common/Inputs/Checkbox';
import Input from 'common/Inputs/Input';
import Label from 'common/Inputs/Label';
import TextArea from 'common/Inputs/TextArea';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import useProducts from 'hooks/useProducts';
import { useForm } from 'react-hook-form';
import { tagsFormSchema, TagsFormSchema } from 'schemas/TagsFormSchema';
import TagRequestDto from 'dtos/Tag/TagRequestDto';
import useTags from 'hooks/useTags';
import { toast } from 'react-toastify';
import { useTagFormContext } from './TagFormContext';

export default function TagForm(): ReactElement {
  const tagForm = useTagFormContext();
  const { products } = useProducts();
  const { createTag, editTag } = useTags();

  const productOptions = useMemo(() => {
    const activeProducts = products.data?.filter((product) => !product.retired) || [];
    return (
      activeProducts.map((product) => {
        return {
          product: product,
          selected: !!tagForm.initialTag?.products?.includes(product.id),
        };
      }) ?? []
    );
  }, [products.data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagsFormSchema>({
    resolver: yupResolver(tagsFormSchema),
    defaultValues: {
      name: tagForm.initialTag?.name ?? '',
      description: tagForm.initialTag?.description ?? '',
      products: productOptions.map<boolean>((option) => tagForm.initialTag?.products?.includes(option.product.id) as boolean),
    },
  });

  const submitForm = async (data: TagsFormSchema): Promise<void> => {
    const legacyProductsIds =
      products.data?.filter((product) => product.retired && tagForm.initialTag?.products?.includes(product.id)).map((product) => product.id) || [];
    const ActiveProductIds = productOptions.filter((option, i) => (data.products ? data.products[i] : false)).map((option) => option.product.id);

    const tagOutput: TagRequestDto = { ...data, products: ActiveProductIds.concat(legacyProductsIds) };

    try {
      if (!tagForm.initialTag) {
        const returnProduct = await createTag.mutateAsync(tagOutput);
        toast.success(`Product "${returnProduct.name}" was succesfully added with ID:"${returnProduct.id}" .`);
      } else {
        const returnProduct = await editTag.mutateAsync({ id: tagForm.initialTag.id, requestDto: tagOutput });
        toast.success(`Product "${returnProduct.name}" was succesfully edited" .`);
      }
      tagForm.closeForm();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const loading = products.isLoading;

  return (
    <>
      {!loading ? (
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
            {productOptions.map((productOption) => {
              return (
                <Checkbox
                  key={productOption.product.id}
                  value={productOption.product.id}
                  label={productOption.product.name}
                  id={productOption.product.id.toString()}
                  defaultChecked={productOption.selected}
                  {...register(`products.${productOption.product.id}`)}
                  disabled={productOption.product.retired}
                />
              );
            })}
          </div>
        </form>
      ) : (
        <LoaderOverlay isEnabled={true} />
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
}

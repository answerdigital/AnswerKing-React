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
import TagProblemDetails from 'dtos/Tag/TagProblemDetails';
import { TagRequestDto } from 'dtos/Tag/TagRequestDto';
import useProducts from 'hooks/useProducts';
import useTags from 'hooks/useTags';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { tagsFormSchema, TagsFormSchema } from 'schemas/TagsFormSchema';
import { useTagFormContext } from './TagFormContext';

export default function TagForm(): ReactElement {
  const tagForm = useTagFormContext();
  const { products } = useProducts(true);
  const { createTag, editTag } = useTags();

  const productOptions = useMemo(
    () =>
      products.data?.map((product) => ({
        product,
        initiallySelected: !!tagForm.initialTag?.products?.includes(product.id),
      })) ?? [],
    [products.data]
  );

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

  const [nameErrors, setNameErrors] = useState<string>('');
  const [descriptionErrors, setDescriptionErrors] = useState<string>('');
  const [productsErrors, setProductsErrors] = useState<string>('');

  useEffect(() => {
    setNameErrors(errors.name?.message ?? '');
    setDescriptionErrors(errors.description?.message ?? '');
    setProductsErrors(errors.products?.message ?? '');
  }, [errors]);

  const displayErrors = (BackendProblems: TagProblemDetails): void => {
    if (BackendProblems.errors.name) {
      setNameErrors(String(BackendProblems.errors.name));
    }
    if (BackendProblems.errors.products) {
      setProductsErrors(String(BackendProblems.errors.products));
    }
    if (BackendProblems.errors.description) {
      setDescriptionErrors(String(BackendProblems.errors.description));
    }
    if (BackendProblems.errors.tag) {
      toast.error(String(BackendProblems.errors.tag));
    }
  };

  const submitForm = async (formData: TagsFormSchema): Promise<void> => {
    const legacyProductsIds =
      products.data?.filter((product) => product.retired && tagForm.initialTag?.products?.includes(product.id)).map((product) => product.id) || [];

    const selectedProductIds = productOptions
      .filter((option, i) => (formData.products ? formData.products[i] : false))
      .map((option) => option.product.id);

    const tagOutput: TagRequestDto = { ...formData, products: selectedProductIds.concat(legacyProductsIds) };

    if (!tagForm.initialTag) {
      createTag.mutate(tagOutput, {
        onSuccess: (data) => {
          toast.success(`${data.name} has been successfully added with an id of ${data.id}`);
          tagForm.closeForm();
        },
        onError: displayErrors,
      });
    } else {
      editTag.mutate(
        { id: tagForm.initialTag.id, requestDto: tagOutput },
        {
          onSuccess: (data) => {
            toast.success(`${data.name} has been successfully updated.`);
            tagForm.closeForm();
          },
          onError: displayErrors,
        }
      );
    }
  };

  const loading = products.isLoading;

  return (
    <>
      {!loading ? (
        <form className="w-full overflow-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="bg-ak-grey-5 col-span-2 row-span-3 flex h-full w-full items-center justify-center">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="col-span-2">
              <Input label="Tag Name" id="tag-name" error={nameErrors} {...register('name')} />
            </div>
            <div className="col-span-2 row-span-2">
              <TextArea label="Text Description" id="text-description" rows={3} error={descriptionErrors} {...register('description')} />
            </div>
            <Label className="col-span-4" error={productsErrors}>
              Products
            </Label>
            {productOptions.map((productOption) => (
              <Checkbox
                key={productOption.product.id}
                value={productOption.product.id}
                label={productOption.product.name}
                id={productOption.product.id.toString()}
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

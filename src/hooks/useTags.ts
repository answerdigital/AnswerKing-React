import { TagDto } from 'dtos/TagDto';
import { TagRequestDto } from 'dtos/TagRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { tagService } from 'services/tagService';
import { ProblemDetails } from 'services/orderService';

interface UpdateTagProps {
  id: number;
  requestDto: TagRequestDto;
}

export interface TagProblemDetails extends ProblemDetails {
  errors: Errors;
}

export interface Errors {
  name: string[];
  price: string[];
  description: string[];
}

interface UseTagsResult {
  tags: UseQueryResult<TagDto[]>;
  createTag: UseMutationResult<TagDto, TagProblemDetails, TagRequestDto>;
  editTag: UseMutationResult<TagDto, TagProblemDetails, UpdateTagProps>;
  removeTag: UseMutationResult<void, TagProblemDetails, number>;
}

export const useTags = (): UseTagsResult => {
  const tags = useQuery<TagDto[]>(['tags'], tagService.getAll);

  const createTag = useMutation<TagDto, TagProblemDetails, TagRequestDto>((requestDto) => tagService.create(requestDto), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  const editTag = useMutation<TagDto, TagProblemDetails, UpdateTagProps>((props) => tagService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  const removeTag = useMutation<void, TagProblemDetails, number>((id) => tagService.remove(id), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  return { tags, createTag, editTag, removeTag };
};

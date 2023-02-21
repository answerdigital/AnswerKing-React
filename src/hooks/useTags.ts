import { TagDto } from 'dtos/TagDto';
import { TagRequestDto } from 'dtos/TagRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { tagService } from 'services/tagService';
import { ProblemDetails } from 'services/orderService';

interface UpdateTagProps {
  id: number;
  requestDto: TagRequestDto;
}

export interface tagProblemDetails extends ProblemDetails {
  errors: errors;
}

export interface errors {
  name: string[];
  price: string[];
  description: string[];
}

interface UseTagsResult {
  tags: UseQueryResult<TagDto[]>;
  createTag: UseMutationResult<TagDto, tagProblemDetails, TagRequestDto>;
  editTag: UseMutationResult<TagDto, tagProblemDetails, UpdateTagProps>;
  removeTag: UseMutationResult<void, ProblemDetails, number>;
}

export const useTags = (): UseTagsResult => {
  const tags = useQuery<TagDto[]>(['items'], tagService.getAll);

  const createTag = useMutation<TagDto, tagProblemDetails, TagRequestDto>((requestDto) => tagService.create(requestDto), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  const editTag = useMutation<TagDto, tagProblemDetails, UpdateTagProps>((props) => tagService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  const removeTag = useMutation<void, tagProblemDetails, number>((id) => tagService.remove(id), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  return { tags, createTag, editTag, removeTag };
};

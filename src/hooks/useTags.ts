import { TagDto } from 'dtos/Tag/TagDto';
import { TagProblemDetails } from 'dtos/Tag/TagProblemDetails';
import { TagRequestDto } from 'dtos/Tag/TagRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import tagService from 'services/tagService';

interface UpdateTagProps {
  id: number;
  requestDto: TagRequestDto;
}

interface UseTagsResult {
  tags: UseQueryResult<TagDto[]>;
  createTag: UseMutationResult<TagDto, TagProblemDetails, TagRequestDto>;
  editTag: UseMutationResult<TagDto, TagProblemDetails, UpdateTagProps>;
  removeTag: UseMutationResult<void, TagProblemDetails, number>;
}

export default function useTags(filtered = false): UseTagsResult {
  const tags = useQuery<TagDto[]>(['tags'], tagService.getAll, {
    select: (data) => (filtered ? data.filter((tag) => !tag.retired) : data),
  });

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

  const removeTag = useMutation<void, TagProblemDetails, number>((id) => tagService.retire(id), {
    onSuccess: () => {
      tags.refetch();
    },
  });

  return { tags, createTag, editTag, removeTag };
}

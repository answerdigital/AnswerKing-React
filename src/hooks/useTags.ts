import { TagDto } from 'dtos/TagDto';
import { useQuery, UseQueryResult } from 'react-query';
import { tagService } from 'services/tagService';

interface UseTagsResult {
  tags: UseQueryResult<TagDto[]>;
}

export const useTags = (): UseTagsResult => {
  const tags = useQuery<TagDto[]>(['tags'], tagService.getAll);

  return { tags };
};

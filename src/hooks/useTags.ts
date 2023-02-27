import { TagDto } from 'dtos/TagDto';
import { useQuery, UseQueryResult } from 'react-query';
import TagService from 'services/tagService';

interface UseTagsResult {
  tags: UseQueryResult<TagDto[]>;
}

export default function useTags(): UseTagsResult {
  const tags = useQuery<TagDto[]>(['tags'], TagService.getAll);
  return { tags };
}

import { TagErrors } from './TagErrors';
import { ProblemDetails } from '../ProblemDetails';

export interface TagProblemDetails extends ProblemDetails {
  errors: TagErrors;
}

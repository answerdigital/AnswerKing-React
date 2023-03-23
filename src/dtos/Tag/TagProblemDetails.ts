import { ProblemDetails } from '../ProblemDetails';

export interface TagErrors {
  tag?: string[];
  name?: string[];
  products?: string[];
  description?: string[];
}

interface TagProblemDetails extends ProblemDetails {
  errors: TagErrors;
}

export default TagProblemDetails;

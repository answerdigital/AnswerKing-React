import { CategoryErrors } from './CategoryErrors';
import { ProblemDetails } from '../ProblemDetails';

export interface CategoryProblemDetails extends ProblemDetails {
  errors: CategoryErrors;
}

export default CategoryProblemDetails;

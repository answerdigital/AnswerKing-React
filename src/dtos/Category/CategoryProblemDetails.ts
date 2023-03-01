import { ProblemDetails } from '../ProblemDetails';

interface CategoryErrors {
  category?: string[];
  name?: string[];
  products?: string[];
  description?: string[];
}

interface CategoryProblemDetails extends ProblemDetails {
  errors: CategoryErrors;
}

export default CategoryProblemDetails;

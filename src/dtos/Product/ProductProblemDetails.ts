import { ProductErrors } from './ProductErrors';
import { ProblemDetails } from '../ProblemDetails';

export interface ProductProblemDetails extends ProblemDetails {
  errors: ProductErrors;
}

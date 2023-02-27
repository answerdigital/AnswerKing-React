import Errors from './ProductErrors';
import ProblemDetails from '../ProblemDetails';

export default interface ProductProblemDetails extends ProblemDetails {
  errors: Errors;
}

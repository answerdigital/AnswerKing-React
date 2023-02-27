import Errors from './CategoryErrors';
import ProblemDetails from '../ProblemDetails';

export default interface CategoryProblemDetails extends ProblemDetails {
  errors: Errors;
}

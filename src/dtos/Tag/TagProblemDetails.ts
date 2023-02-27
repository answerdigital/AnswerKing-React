import Errors from './TagErrors';
import ProblemDetails from '../ProblemDetails';

export default interface TagProblemDetails extends ProblemDetails {
  errors: Errors;
}

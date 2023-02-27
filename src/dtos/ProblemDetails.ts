import { Errors } from './Errors';

export interface ProblemDetails {
  type: string;
  title: string;
  detail?: string;
  status: number;
  traceId: string;
  instance?: string;
}

export interface ProductProblemDetails extends ProblemDetails {
  errors: Errors;
}

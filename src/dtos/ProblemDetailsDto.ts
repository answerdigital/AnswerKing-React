export interface ExtendedProblemDetails extends ProblemDetails {
  errors: Errors;
}

export interface Errors {
  name: string[];
  price: string[];
  description: string[];
}

export interface ProblemDetails {
  type: string;
  title: string;
  detail?: string;
  status: number;
  traceId: string;
  instance?: string;
}

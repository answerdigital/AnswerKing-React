import { ProblemDetails } from '../ProblemDetails';

interface ProductErrors {
  product?: string[];
  name?: string[];
  price?: string[];
  description?: string[];
  categoryId?: string[];
  tagsIds?: string[];
  stock?: string[];
}

interface ProductProblemDetails extends ProblemDetails {
  errors: ProductErrors;
}

export default ProductProblemDetails;

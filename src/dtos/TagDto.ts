export interface TagDto {
  id: number;
  name?: string;
  description?: string;
  createdOn: Date;
  products?: number[];
  retired: boolean;
}

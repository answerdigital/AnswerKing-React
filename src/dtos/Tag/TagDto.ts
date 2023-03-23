export interface TagDto {
  id: number;
  name?: string;
  description?: string;
  createdOn: Date;
  lastUpdated: Date;
  products?: number[];
  retired: boolean;
}

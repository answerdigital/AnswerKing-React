export default interface ProductRequestDto {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  tagsIds: number[];
}

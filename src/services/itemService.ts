import { httpClient } from 'utilities/http-client';

export interface ProblemDetails {
  type: string;
  title: string;
  detail?: string;
  status: number;
  traceId: string;
  instance?: string;
}

export class ItemService<ReturnType,RequestType> {
  item = 'products';
  public constructor(item:'orders'|'categories'|'products'|'tags') {
    this.item = item;
  }
  private async errorHandler (response:Response):Promise<ReturnType[]> {
    if (!response.ok) {
      try {
        return Promise.reject(await response.json());
      } catch {
        return Promise.reject();
      }
    }
    return await response.json();
  };

  public async getAll(): Promise<ReturnType[]> {
    const response = await httpClient.get(`/${this.item}`);

    return await this.errorHandler(response);
  };

  public async getById(id: number): Promise<ReturnType> {
    const response = await httpClient.get(`/${this.item}/${id}`);

    return (await this.errorHandler(response))[0];
  };

  public async create(createDto: RequestType): Promise<ReturnType> {
    const response = await httpClient.post(`/${this.item}`, createDto);

    return (await this.errorHandler(response))[0];
  };

  public async edit(id: number, createDto: RequestType): Promise<ReturnType> {
    const response = await httpClient.put(`/${this.item}/${id}`, createDto);

    return (await this.errorHandler(response))[0];
  };

  public async remove(id: number): Promise<void> {
    const response = await httpClient.remove(`/${this.item}/${id}`);

    await this.errorHandler(response);
  };
}

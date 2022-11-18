import { CategoryDto } from 'dtos/CategoryDto';
import { stringify } from 'querystring';
import { httpClient } from 'utilities/http-client';

const getAll = async (): Promise<CategoryDto[]> => {
  const response = await httpClient.get('/categories');

  // if (!response.ok) {
  //   try {
  //     return Promise.reject(await response.json());
  //   } catch {
  //     return Promise.reject();
  //   }
  // }

  // return await response.json();

  return dummyData();
};

const dummyData = (): any => {

  const Burgers: CategoryDto = {
    id: 1,
    name: 'Burger',
    description: 'juicy burgers'
  };

  const Sides: CategoryDto = {
    id: 2,
    name: 'Sides',
    description: 'Small side orders'
  };

  const Drinks: CategoryDto = {
    id: 3,
    name: 'Drinks',
    description: 'Drinkable liquids'
  };

  const _categories: CategoryDto[] = [];
  
  _categories.push(Burgers);
  _categories.push(Sides);
  _categories.push(Drinks);

  return _categories;
};

export const categoryService = { getAll };
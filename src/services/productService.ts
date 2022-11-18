import { ProductDto } from 'dtos/ProductDto';
import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { httpClient } from 'utilities/http-client';
import { CategoryDto } from 'dtos/CategoryDto';

const getAll = async (): Promise<ProductDto[]> => {
  const response = await httpClient.get('/products');

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

const create = async (createDto: CreatedProductDto): Promise<ProductDto> => {
  const response = await httpClient.post('/products', createDto);

  if (!response.ok) {
    try {
      return Promise.reject(await response.json());
    } catch {
      return Promise.reject();
    }
  }

  return await response.json();
};

const remove = async (id: number): Promise<void> => {
  const response = await httpClient.remove('/products/' + id);

  if (!response.ok) {
    return Promise.reject();
  }
};


const dummyData = (): any => {

  // export interface CategoryDto {
  //   id: number;
  //   name?: string;
  //   description?: string;
  // }
  // export interface ProductDto {
  //   id: number;
  //   name?: string;
  //   price: number;
  //   description?: string;
  //   categories?: CategoryDto[];
  // }

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

  const catArray1: CategoryDto[] = []; 
  const catArray2: CategoryDto[] = [];
  const catArray3: CategoryDto[] = [];
  const _categories: CategoryDto[] = [];
  const _products: ProductDto[] = [];

  catArray1.push(Burgers);
  catArray2.push(Sides);
  catArray3.push(Drinks);
  _categories.push(Burgers);
  _categories.push(Sides);
  _categories.push(Drinks);

  const ChickenBurger: ProductDto = {
    id: 1,
    name: 'Chicken Burger',
    price: 5.00,
    description: 'Chicken fillet in a brioche bun.',
    categories: catArray1
  };

  _products.push(ChickenBurger);

  const BeefBurger: ProductDto = {
    id: 2,
    name: 'Beef Burger',
    price: 5.50,
    description: 'Beef ',
    categories: catArray1
  };

  _products.push(BeefBurger);

  const VeganBurger: ProductDto = {
    id: 3,
    name: 'Vegan Burger',
    price: 5.50,
    description: 'It just a big mushroom',
    categories: catArray1
  };

  _products.push(VeganBurger);

  const FishBurger: ProductDto = {
    id: 4,
    name: 'Fish Burger',
    price: 5.50,
    description: 'Tuna steak in a bun',
    categories: catArray1
  };

  _products.push(FishBurger);
  
  const LargeChips: ProductDto = {
    id: 5,
    name: 'Large Chips',
    price: 2.00,
    description: 'Large portion of chips',
    categories: catArray2
  };

  _products.push(LargeChips);
  
  const SmallChips: ProductDto = {
    id: 6,
    name: 'Small Chips',
    price: 5.50,
    description: 'Small portion of chips.',
    categories: catArray2
  };

  _products.push(SmallChips);
  
  const OnionRings: ProductDto = {
    id: 7,
    name: 'Onion Rings',
    price: 5.50,
    description: 'Rings of Onion battered.',
    categories: catArray2
  };

  _products.push(OnionRings);

  const MozzerellaDippers: ProductDto = {
    id: 8,
    name: 'Mozzerella dippers',
    price: 5.50,
    description: 'Battered mozzer',
    categories: catArray2
  };

  _products.push(MozzerellaDippers);

  const Coke: ProductDto = {
    id: 9,
    name: 'Coke',
    price: 1.00,
    description: 'Brown sweet goodness',
    categories: catArray3
  };

  _products.push(Coke);

  const DietCoke: ProductDto = {
    id: 10,
    name: 'Diet Coke',
    price: 1.00,
    description: 'Healthy brown sweet goodness',
    categories: catArray3
  };

  _products.push(DietCoke);

  const Fanta: ProductDto = {
    id: 11,
    name: 'Orange Fanta',
    price: 1.00,
    description: 'Fizzy orange bev',
    categories: catArray3
  };

  _products.push(Fanta);

  const Lilt: ProductDto = {
    id: 12,
    name: 'Lilt',
    price: 1.00,
    description: 'Tropical fruity fizzy stuff',
    categories: catArray3
  };

  _products.push(Lilt);

  const Beer: ProductDto = {
    id: 13,
    name: 'Beer',
    price: 1.00,
    description: 'Cheap and cheerful',
    categories: catArray3
  };

  _products.push(Beer);


  return _products;

};



export const productService = { getAll, create, remove };
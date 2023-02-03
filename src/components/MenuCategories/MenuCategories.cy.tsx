import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {MenuCategories} from './MenuCategories';
import {categories} from '../../../cypress/data_helpers/component-test-data';
// import React, { useState } from 'react';

// This test doesn't work in order to validate state here you would have to create a wrapper component that would pass in a new state object as a prop
// (I think)

//
// const [selectedCategory, setSelectedCategory] = useState<number>(1);
//
// describe('Local Order Details', () => {
//   beforeEach(() => {
//     CustomMount(
//       <MenuCategories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} ></MenuCategories>
//     );
//   });
//
//   it('should show category 1', () => {
//     cy.log('Hello world!');
//   });
// });

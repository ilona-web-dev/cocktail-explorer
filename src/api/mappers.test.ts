import { describe, expect, it } from 'vitest';
import { getIngredients } from './mappers';
import type { CocktailDbDrink } from './types';

function makeDrink(overrides: Partial<CocktailDbDrink>): CocktailDbDrink {
   return {
      idDrink: '1',
      strDrink: 'Test',
      strDrinkThumb: null,
      strInstructions: null,
      strIngredient1: null,
      strIngredient2: null,
      strIngredient3: null,
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: null,
      strMeasure2: null,
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      ...overrides,
   };
}

describe('getIngredients', () => {
   it('maps ingredient/measure pairs and skips empty slots', () => {
      const drink = makeDrink({
         strIngredient1: 'Vodka',
         strMeasure1: '50 ml',
         strIngredient2: '  Lime juice  ',
         strMeasure2: null,
         strIngredient3: null,
         strMeasure3: 'should be ignored',
      });

      expect(getIngredients(drink)).toEqual([
         { ingredient: 'Vodka', measure: '50 ml' },
         { ingredient: 'Lime juice' },
      ]);
   });
});

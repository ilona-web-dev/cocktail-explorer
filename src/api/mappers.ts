import type { CocktailDbDrink } from './types';

export type IngredientLine = {
   ingredient: string;
   measure?: string;
};

export function getIngredients(drink: CocktailDbDrink): IngredientLine[] {
   const items: IngredientLine[] = [];

   for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof CocktailDbDrink];
      const measure = drink[`strMeasure${i}` as keyof CocktailDbDrink];

      const ingredientText =
         typeof ingredient === 'string' ? ingredient.trim() : '';
      if (!ingredientText) continue;

      const measureText = typeof measure === 'string' ? measure.trim() : '';

      items.push(
         measureText
            ? { ingredient: ingredientText, measure: measureText }
            : { ingredient: ingredientText },
      );
   }

   return items;
}

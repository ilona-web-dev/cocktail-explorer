import type { CocktailDbDrink, CocktailDbResponse } from './types';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

async function fetchJson<T>(url: string): Promise<T> {
   const res = await fetch(url);
   if (!res.ok) throw new Error(`API error: ${res.status}`);
   const data = (await res.json()) as T;
   return data;
}

export async function searchCocktailsByName(
   query: string,
): Promise<CocktailDbDrink[]> {
   const q = query.trim();
   if (!q) return [];
   const response = await fetchJson<CocktailDbResponse>(
      `${BASE_URL}/search.php?s=${encodeURIComponent(q)}`,
   );
   return response.drinks ?? [];
}

export async function getRandomCocktail(): Promise<CocktailDbDrink> {
   const response = await fetchJson<CocktailDbResponse>(
      `${BASE_URL}/random.php`,
   );
   if (!response.drinks?.[0]) throw new Error('No random cocktail returned');
   return response.drinks[0];
}

export async function lookupCocktailById(
   id: string,
): Promise<CocktailDbDrink | null> {
   const trimmedId = id.trim();
   if (!trimmedId) return null;
   const response = await fetchJson<CocktailDbResponse>(
      `${BASE_URL}/lookup.php?i=${encodeURIComponent(trimmedId)}`,
   );
   return response.drinks?.[0] ?? null;
}

export { BASE_URL, fetchJson };

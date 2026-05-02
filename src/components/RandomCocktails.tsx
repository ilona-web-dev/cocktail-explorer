import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../api/cocktailDb';
import type { CocktailDbDrink } from '../api/types';

export default function RandomCocktails() {
   const [status, setStatus] = useState<'idle' | 'loading'>('idle');
   const [error, setError] = useState<string | null>(null);
   const [randomDrinks, setRandomDrinks] = useState<CocktailDbDrink[]>([]);

   async function handlerShowRandom() {
      setStatus('loading');
      setError(null);

      try {
         const result = await Promise.all([
            getRandomCocktail(),
            getRandomCocktail(),
            getRandomCocktail(),
         ]);
         setRandomDrinks(result);
      } catch {
         setError('Something went wrong. Please try again.');
      } finally {
         setStatus('idle');
      }
   }

   async function handlerSeeMore() {
      setStatus('loading');
      setError(null);

      try {
         const newUnique = await Promise.all([
            getRandomCocktail(),
            getRandomCocktail(),
            getRandomCocktail(),
         ]);
         setRandomDrinks((prev) => {
            const existingIds = new Set(prev.map((drink) => drink.idDrink));
            const filtered = newUnique.filter(
               (drink) => !existingIds.has(drink.idDrink),
            );
            return [...prev, ...filtered];
         });
      } catch {
         setError('Something went wrong. Please try again.');
      } finally {
         setStatus('idle');
      }
   }

   return (
      <>
         <h2>Random cocktails</h2>
         <div>
            <button disabled={status === 'loading'} onClick={handlerShowRandom}>
               Show 3 random cocktails
            </button>
            {randomDrinks.length > 0 && (
               <button disabled={status === 'loading'} onClick={handlerSeeMore}>
                  See more (+3)
               </button>
            )}
            {error && <p role="alert">{error}</p>}
            {status === 'loading' && <p aria-live="polite">Loading...</p>}
            <ul>
               {randomDrinks.map((drink) => (
                  <li key={drink.idDrink}>
                     <Link to={`/cocktail/${drink.idDrink}`}>
                        {drink.strDrink}
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
}

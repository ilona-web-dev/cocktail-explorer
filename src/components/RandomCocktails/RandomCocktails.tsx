import { useState } from 'react';
import styles from './RandomCocktails.module.css';
import { getRandomCocktail } from '../../api/cocktailDb';
import type { CocktailDbDrink } from '../../api/types';
import CocktailList from '../CocktailList/CocktailList';

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
      <div className={styles.wrapper}>
         <h2>Random cocktails</h2>
         <div>
            <div className={styles.controls}>
               <button
                  disabled={status === 'loading'}
                  onClick={handlerShowRandom}>
                  Show 3 random cocktails
               </button>
               {randomDrinks.length > 0 && (
                  <button
                     disabled={status === 'loading'}
                     onClick={handlerSeeMore}>
                     See more (+3)
                  </button>
               )}
            </div>

            <div className={styles.status}>
               {error && <p role="alert">{error}</p>}
               {status === 'loading' && <p aria-live="polite">Loading...</p>}
            </div>

            <CocktailList drinks={randomDrinks} />
         </div>
      </div>
   );
}

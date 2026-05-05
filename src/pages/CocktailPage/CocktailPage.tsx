import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lookupCocktailById } from '../../api/cocktailDb';
import type { CocktailDbDrink } from '../../api/types';
import { getIngredients } from '../../api/mappers';
import styles from './CocktailPage.module.css';

type Status = 'loading' | 'success' | 'error' | 'notfound';

export default function CocktailPage() {
   const { id } = useParams();
   const [status, setStatus] = useState<Status>('loading');
   const [drink, setDrink] = useState<CocktailDbDrink | null>(null);

   useEffect(() => {
      let cancelled = false;

      async function fetchData() {
         setStatus('loading');
         setDrink(null);

         try {
            const result = await lookupCocktailById(id ?? '');
            if (cancelled) return;

            if (!result) {
               setStatus('notfound');
               return;
            }

            setDrink(result);
            setStatus('success');
         } catch {
            if (cancelled) return;
            setStatus('error');
         }
      }

      fetchData();

      return () => {
         cancelled = true;
      };
   }, [id]);

   const ingredients = drink ? getIngredients(drink) : [];

   return (
      <div className={styles.wrapper}>
         <Link to="/" className={styles.backLink}>
            ← Back
         </Link>

         {status === 'success' && drink && (
            <article>
               <h1>{drink.strDrink}</h1>
               <div className={styles.imgWrapper}>
                  <img
                     src={drink.strDrinkThumb ?? ''}
                     alt={drink.strDrink}
                     loading="lazy"
                     className={styles.img}
                  />
               </div>
               {ingredients.length > 0 && (
                  <>
                     <h2>Ingredients</h2>
                     <ul className={styles.ingredientsList}>
                        {ingredients.map((item, index) => (
                           <li
                              key={`${item.ingredient}-${index}-${item.measure ?? ''}`}>
                              {item.measure
                                 ? `${item.ingredient} - ${item.measure}`
                                 : item.ingredient}
                           </li>
                        ))}
                     </ul>
                  </>
               )}
               <div className={styles.instructions}>
                  {drink.strInstructions && (
                     <>
                        <h2>Instructions:</h2>
                        <p>{drink.strInstructions}</p>
                     </>
                  )}
               </div>
            </article>
         )}

         {status === 'loading' && <p aria-live="polite">Loading…</p>}

         {status === 'error' && (
            <p role="alert">
               Couldn’t load cocktail details. Please try again.
            </p>
         )}

         {status === 'notfound' && <p>Not found.</p>}
      </div>
   );
}

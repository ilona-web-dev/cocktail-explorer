import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lookupCocktailById } from './api/cocktailDb';
import type { CocktailDbDrink } from './api/types';
import { getIngredients } from './api/mappers';

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
      <div>
         <Link to="/">Back</Link>

         {status === 'success' && drink && (
            <article>
               <h1>{drink.strDrink}</h1>
               <img
                  src={drink.strDrinkThumb ?? ''}
                  alt={drink.strDrink}
                  loading="lazy"
                  width={320}
               />
               <ul>
                  {ingredients.map((item, index) => (
                     <li
                        key={`${item.ingredient}-${index}-${item.measure ?? ''}`}>
                        {item.measure
                           ? `${item.ingredient} - ${item.measure}`
                           : item.ingredient}
                     </li>
                  ))}
               </ul>
               {drink.strInstructions && <p>{drink.strInstructions}</p>}
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

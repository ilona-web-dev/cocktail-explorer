import { useState } from 'react';
import styles from './SearchCocktails.module.css';
import { searchCocktailsByName } from '../../api/cocktailDb';
import type { CocktailDbDrink } from '../../api/types';
import CocktailList from '../CocktailList/CocktailList';

export default function SearchCocktails() {
   const [query, setQuery] = useState('');
   const [status, setStatus] = useState<'idle' | 'loading'>('idle');
   const [results, setResults] = useState<CocktailDbDrink[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [hasSearched, setHasSearched] = useState(false);

   async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
      e.preventDefault();

      setHasSearched(true);
      setStatus('loading');
      setError(null);

      try {
         const drinks = await searchCocktailsByName(query);
         setResults(drinks);
      } catch {
         setError('Something went wrong. Please try again.');
      } finally {
         setStatus('idle');
      }
   }
   return (
      <div className={styles.wrapper}>
         <h2>Search</h2>
         <form onSubmit={handleSubmit}>
            <label htmlFor="search" className={styles.label}>
               Search cocktails by name
            </label>
            <div className={styles.row}>
               <input
                  id="search"
                  type="search"
                  value={query}
                  placeholder="e.g. Margarita"
                  name="query"
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.input}
               />
               <button type="submit" disabled={status === 'loading'}>
                  Search
               </button>
            </div>
         </form>
         <div className={styles.status}>
            {status === 'loading' && <p aria-live="polite">Searching...</p>}
            {error && <p role="alert">{error}</p>}
         </div>

         {hasSearched &&
            status === 'idle' &&
            !error &&
            query.trim() &&
            results.length === 0 && <p>No results found. Try again.</p>}
         {results.length > 0 && <CocktailList drinks={results} />}
      </div>
   );
}

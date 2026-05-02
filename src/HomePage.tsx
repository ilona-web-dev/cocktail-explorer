import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchCocktailsByName } from './api/cocktailDb';
import type { CocktailDbDrink } from './api/types';

export default function HomePage() {
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
      setResults([]);

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
      <div>
         <h1>Cocktail Explorer</h1>
         <h2>Search for a cocktail or discover random picks</h2>
         <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search cocktails by name</label>
            <input
               id="search"
               type="search"
               value={query}
               placeholder="e.g. Margarita"
               name="query"
               onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" disabled={status === 'loading'}>
               Search
            </button>
         </form>
         {status === 'loading' && <p aria-live="polite">Searching...</p>}
         {error && <p role="alert">{error}</p>}
         {hasSearched &&
            status === 'idle' &&
            !error &&
            query.trim() &&
            results.length === 0 && <p>No results found. Try again.</p>}
         {results.length > 0 && (
            <ul>
               {results.map((drink) => (
                  <li key={drink.idDrink}>
                     <Link to={`/cocktail/${drink.idDrink}`}>
                        {drink.strDrink}
                     </Link>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

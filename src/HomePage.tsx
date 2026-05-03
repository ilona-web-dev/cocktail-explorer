import SearchCocktails from './components/SearchCocktails';
import RandomCocktails from './components/RandomCocktails';

export default function HomePage() {
   return (
      <div>
         <h1>Cocktail Explorer</h1>
         <h2>Search for a cocktail or discover random picks</h2>

         <SearchCocktails />
         <RandomCocktails />
      </div>
   );
}

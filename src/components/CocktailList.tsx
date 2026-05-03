import { Link } from 'react-router-dom';
import type { CocktailDbDrink } from '../api/types';

export default function CocktailList({
   drinks,
}: {
   drinks: CocktailDbDrink[];
}) {
   return (
      <ul>
         {drinks.map((drink) => (
            <li key={drink.idDrink}>
               <Link to={`/cocktail/${drink.idDrink}`}>{drink.strDrink}</Link>
            </li>
         ))}
      </ul>
   );
}

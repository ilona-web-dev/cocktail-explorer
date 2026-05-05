import { Link } from 'react-router-dom';
import type { CocktailDbDrink } from '../../api/types';
import styles from './CocktailList.module.css';

export default function CocktailList({
   drinks,
}: {
   drinks: CocktailDbDrink[];
}) {
   return (
      <ul className={styles.list}>
         {drinks.map((drink) => (
            <li key={drink.idDrink} className={styles.item}>
               <Link to={`/cocktail/${drink.idDrink}`} className={styles.link}>
                  <div className={styles.imgWrapper}>
                     <img
                        src={drink.strDrinkThumb ?? ''}
                        alt={drink.strDrink}
                        loading="lazy"
                        className={styles.img}
                     />
                  </div>
                  <p>{drink.strDrink}</p>
               </Link>
            </li>
         ))}
      </ul>
   );
}

import Banner from '../../components/Banner/Banner';
import SearchCocktails from '../../components/SearchCocktails/SearchCocktails';
import RandomCocktails from '../../components/RandomCocktails/RandomCocktails';
import styles from './HomePage.module.css';

export default function HomePage() {
   return (
      <div>
         <div className={styles.welcome}>
            <h1>Are you ready for a cocktail party?</h1>
            <h2>Find a recipe fast or discover something new with Random.</h2>
         </div>
         <Banner />
         <SearchCocktails />
         <RandomCocktails />
      </div>
   );
}

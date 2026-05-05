import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

export default function Header() {
   return (
      <header className={styles.header}>
         <Logo />
         <Link to="/" className={styles.title}>
            Cocktail Explorer
         </Link>
      </header>
   );
}

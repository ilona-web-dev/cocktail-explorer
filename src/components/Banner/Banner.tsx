import mainBanner from '../../assets/cocktail-party-main.jpg';
import styles from './Banner.module.css';

export default function Banner() {
   return (
      <div className={styles.imgWrapper}>
         <img className={styles.img} src={mainBanner} alt="Cocktails party" />
      </div>
   );
}

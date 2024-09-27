import css from './Home.module.css';
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className={css.homeDisplay}>
      <div>
        <div className={css.homeTitle}>Your Contacts, Anytime, Anywhere</div>
        <div className={css.homeIntro}>
          Welcome to Yellow Connect! Securely store your contacts and access
          them on any device. Our user-friendly platform makes it easy to keep
          your connections organized and up-to-date.
        </div>
      </div>
      <Link to="/sharedLayout/contacts" className={css.homeLink}>
        Start Connecting
      </Link>
    </div>
  );
    
};
export default Home;
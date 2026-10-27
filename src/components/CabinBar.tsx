import { Link } from 'react-router';

import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import logo from '../data/img/logo.svg';
import { selectIsLoggedIn } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';
import styles from './CabinBar.module.css';

// The site's top bar: the cabin's ridge beam.
export default function CabinBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <header className={styles.beam}>
      <div className={styles.inner}>
        <Link to='/' className={styles.home}>
          <img src={logo} alt='' width={36} height={36} />
          Wassociates
        </Link>
        {isLoggedIn ? <ProfileButton /> : <LoginButton />}
      </div>
    </header>
  );
}

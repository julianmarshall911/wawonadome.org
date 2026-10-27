import { useRouteError } from 'react-router';

import styles from './RouteError.module.css';

// Shown instead of a blank page when something throws while rendering.
export default function RouteError() {
  const error = useRouteError();
  console.error(error);
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p>The page hit an error while loading. Reloading usually fixes it.</p>
      <button
        type='button'
        className={styles.reload}
        onClick={() => window.location.reload()}>
        Reload page
      </button>
    </main>
  );
}

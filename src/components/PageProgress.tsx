import { ProgressBar } from 'react-aria-components';

import styles from './PageProgress.module.css';

export default function PageProgress() {
  return (
    <div className={styles.page}>
      <ProgressBar
        isIndeterminate
        aria-label='Loading'
        className={styles.spinner}
      />
    </div>
  );
}

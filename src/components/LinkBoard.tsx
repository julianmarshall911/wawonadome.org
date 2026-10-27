import Icon from './Icon';
import PageProgress from './PageProgress';
import { linkIcon } from '../data/IconMapper';
import type { UserDataEntry } from '../store/dataSlice';
import styles from './LinkBoard.module.css';

interface LinkBoardProps {
  entry: UserDataEntry;
  label: string;
}

// The member page's board of links, each a tag hung on the cabin wall.
export default function LinkBoard({
  entry: { status, data },
  label,
}: LinkBoardProps) {
  if (status === 'idle' || status === 'pending') {
    return <PageProgress />;
  }

  const links = Object.entries(data?.links ?? {});
  if (links.length === 0) {
    return (
      <p className={styles.empty}>
        {status === 'failed' ? "Couldn't load links." : 'No links yet.'}
      </p>
    );
  }

  return (
    <nav aria-label={label}>
      <ul className={styles.grid}>
        {links.map(([title, url]) => (
          <li key={title}>
            <a
              className={styles.tile}
              href={url}
              target='_blank'
              rel='noopener noreferrer'>
              <Icon name={linkIcon(title)} size={40} />
              <span className={styles.label}>{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

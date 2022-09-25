import Link from 'next/link';
import styles from './SideBar.module.css';

function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <div>
        <Link href="/">allysson.me</Link>
      </div>
    </aside>
  );
}

export { SideBar };

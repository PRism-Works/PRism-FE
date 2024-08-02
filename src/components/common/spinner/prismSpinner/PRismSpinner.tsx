import styles from './PRismSpinner.module.css';
import { cn } from '@/lib/utils';

export default function PrismSpinner() {
  return (
    <div className={styles['pyramid-loader']}>
      <div className={styles.wrapper}>
        <span className={cn(styles.side, styles.side1)}></span>
        <span className={cn(styles.side, styles.side2)}></span>
        <span className={cn(styles.side, styles.side3)}></span>
        <span className={cn(styles.side, styles.side4)}></span>
        <span className={styles.shadow}></span>
      </div>
    </div>
  );
}

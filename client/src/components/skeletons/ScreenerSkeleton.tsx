import styles from './ScreenerSkeleton.module.scss';

export default function ScreenerSkeleton() {
  return (
      <div className={styles.skeletonWrapper}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.skeletonItem} />
        ))}
      </div>
  );
}

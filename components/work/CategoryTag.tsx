import { categoryLabels } from '@/content/work';
import type { WorkCategory } from '@/content/types';
import styles from './CategoryTag.module.css';

/** The pill every work item wears. The dot's colour is the only thing that varies. */
export function CategoryTag({ category }: { category: WorkCategory }) {
  return (
    <span className={styles.tag} data-category={category}>
      <span className={styles.dot} aria-hidden="true" />
      {categoryLabels[category]}
    </span>
  );
}

export default CategoryTag;

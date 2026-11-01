import styles from './FlowCover.module.css';

/*
 * A banking app is a handset and a card, and a Figma prototype is the wire
 * between two screens. So: two phones, the front one open on a home screen,
 * the back one on a sign-in, a prototype connector running from the one to the
 * other, and a bank card lifted out of the screen toward the viewer. The
 * screens are skeletons and the card carries no number — the cover claims
 * nothing about any particular screen of the app.
 */

export function FlowCover() {
  return (
    <>
      {/* Back phone: sign in */}
      <div className={styles.phone} data-n="back">
        <span className={styles.island} />
        <div className={styles.screen}>
          <i className={styles.mark} />
          <i className={styles.bar} data-w="44" />
          <i className={styles.field} />
          <i className={styles.field} />
          <i className={styles.button} />
        </div>
      </div>

      {/* Front phone: home */}
      <div className={styles.phone} data-n="front">
        <span className={styles.island} />
        <div className={styles.screen}>
          <span className={styles.greet}>
            <i className={styles.avatar} />
            <span>
              <i className={styles.bar} data-w="70" />
              <i className={styles.bar} data-w="44" />
            </span>
          </span>
          <i className={styles.balance} />
          <span className={styles.actions}>
            <i />
            <i />
            <i />
            <i />
          </span>
          {[0, 1, 2].map((n) => (
            <span key={n} className={styles.item}>
              <i />
              <span>
                <i className={styles.bar} data-w="70" />
                <i className={styles.bar} data-w="40" />
              </span>
              <i className={styles.amount} />
            </span>
          ))}
        </div>
      </div>

      <svg className={styles.wire} viewBox="0 0 40 25" preserveAspectRatio="none">
        <path d="M12.6 17.4 C15 17.4 14.6 15.4 17 15.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.node} data-end="start" />
      <span className={styles.node} data-end="end" />

      {/* The card, lifted off the screen */}
      <div className={styles.card}>
        <span className={styles.chip} />
        <span className={styles.lines}>
          <i />
          <i />
        </span>
        <span className={styles.network}>
          <i />
          <i />
        </span>
      </div>
    </>
  );
}

export default FlowCover;

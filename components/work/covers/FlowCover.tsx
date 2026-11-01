import styles from './FlowCover.module.css';

/*
 * A Figma prototype is screens plus the wires between them — the connectors
 * that make a set of frames something you can click through. So the cover is
 * three frames and the noodle lines that join them, the middle frame selected
 * the way it is on the canvas. The screens are skeletons: they claim no
 * particular screen of the app.
 */

function SignIn() {
  return (
    <>
      <i className={styles.mark} />
      <i className={styles.field} />
      <i className={styles.field} />
      <i className={styles.button} />
    </>
  );
}

function Home() {
  return (
    <>
      <i className={styles.bar} />
      <i className={styles.hero} />
      <span className={styles.actions}>
        <i />
        <i />
        <i />
        <i />
      </span>
      {[0, 1, 2].map((n) => (
        <span key={n} className={styles.item}>
          <i />
          <i />
        </span>
      ))}
    </>
  );
}

function List() {
  return (
    <>
      <i className={styles.bar} />
      {[0, 1, 2, 3, 4].map((n) => (
        <span key={n} className={styles.item}>
          <i />
          <i />
        </span>
      ))}
    </>
  );
}

const FRAMES = [
  { name: '01', Screen: SignIn },
  { name: '02', Screen: Home },
  { name: '03', Screen: List },
];

export function FlowCover() {
  return (
    <>
      {FRAMES.map(({ name, Screen }, i) => (
        <div key={name} className={styles.frame} data-n={i + 1} data-selected={i === 1 ? 'true' : 'false'}>
          <span className={styles.name}>{name}</span>
          <div className={styles.screen}>
            <Screen />
          </div>
          {i === 1 && (
            <>
              <b data-corner="tl" />
              <b data-corner="tr" />
              <b data-corner="bl" />
              <b data-corner="br" />
            </>
          )}
        </div>
      ))}

      <svg className={styles.wires} viewBox="0 0 40 25" preserveAspectRatio="none">
        <path d="M11.8 14.2 C13.8 14.2 13.6 12.4 15.5 12.4" vectorEffect="non-scaling-stroke" />
        <path d="M24.2 12.4 C26.2 12.4 26.1 14.6 28 14.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className={styles.node} data-n="1" />
      <span className={styles.node} data-n="2" />
      <span className={styles.node} data-n="3" data-end="true" />
      <span className={styles.node} data-n="4" data-end="true" />
    </>
  );
}

export default FlowCover;

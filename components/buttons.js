import React from 'react';
import styles from '../styles/Buttons.module.css';

const Buttons = (props) => {
  const { clearDesk, applyWaterMark } = props;
  return (
    <div className={styles.buttons}>
      <button className={styles.button} onClick={clearDesk}>
        X
      </button>
      <button className={styles.button}>+</button>
      <button className={styles.button} onClick={applyWaterMark}>
        A
      </button>
      <button
        className={styles.button}
        /* Add download handler -> corresponding formats */
      >
        D
      </button>
    </div>
  );
};

export default Buttons;

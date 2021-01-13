import React from 'react';
import styles from '../styles/Buttons.module.css';

const Buttons = (props) => {
  const { clearDesk, applyWaterMark, downloadImages } = props;
  return (
    <div className={styles.buttons}>
      <button
        className={styles.button}
        onClick={clearDesk}
        title="Clear the page."
      >
        X
      </button>
      {/* <button className={styles.button}>+</button> */}
      <button
        className={styles.button}
        onClick={applyWaterMark}
        title="Apply watermarks."
      >
        A
      </button>
      <button
        className={styles.button}
        onClick={downloadImages}
        title="Download the edited images."
      >
        D
      </button>
    </div>
  );
};

export default Buttons;

import React from 'react';
import styles from '../styles/Buttons.module.css';

const Buttons = (props) => {
  const {
    rotateWatermark,
    moveLeft,
    moveRight,
    clearDesk,
    applyWaterMark,
    downloadImages,
    darkenProps,
  } = props;
  return (
    <div className={styles.buttons}>
      <button
        className={styles.button}
        onClick={clearDesk}
        title="Clear the page."
      >
        X
      </button>
      <button
        className={styles.button}
        onClick={applyWaterMark}
        title="Apply watermarks."
      >
        A
      </button>
      <button
        className={styles.button}
        onClick={moveLeft}
        title="Move watermarks left."
      >
        &lt;
      </button>
      <button
        className={styles.button}
        onClick={rotateWatermark}
        title="Rotate watermarks."
      >
        R
      </button>
      <button
        className={styles.button}
        onClick={moveRight}
        title="Move watermarks right."
      >
        &gt;
      </button>
      <button
        className={styles.button}
        onClick={downloadImages}
        title="Download the edited images."
      >
        D
      </button>
      <button
        className={`${styles.darkButton} ${styles.button}`}
        onClick={darkenProps.darkenPage}
        title="Dark mode."
      >
        {darkenProps.theme === 'light' ? '🌙' : '🌞'}
      </button>
      <a href="https://github.com/poyea/" target="_blank" rel="noreferrer">
        <input
          type="image"
          alt="@poyea"
          className={styles.button}
          src="https://avatars3.githubusercontent.com/u/24757020"
        />
      </a>
    </div>
  );
};

export default Buttons;

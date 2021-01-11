import React from 'react';
import styles from '../styles/Dragover.module.css';

const Dragover = (props) => {
  const { isDragFocus } = props;

  return (
    <div
      className={`${styles.zone} ${isDragFocus ? styles.focus : ''}`}
      id="dragover"
    ></div>
  );
};

export default Dragover;

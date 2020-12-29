import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [files, setFilesState] = useState([]);
  const [isSticky, setSticky] = useState(false);
  const refStickyContainer = useRef(null);

  const handleScroll = () => {
    if (refStickyContainer.current) {
      setSticky(refStickyContainer.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleUploadFiles = (files) => {
    if (files.length === 0) {
      return;
    }
    let filesArray = [];
    for (let i = 0; i < files.length; ++i) {
      filesArray.push(files[i]);
    }
    setFilesState(filesArray);
  };
  return (
    <>
      <main className={styles.main}>
        <Head>
          <title>Image Watermarker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          ref={refStickyContainer}
          className={`
            ${isSticky ? styles.stickybanner : ''}
            `}
        >
          <h1
            className={`
            ${styles.title} ${
              isSticky ? styles.sticky + ' ' + styles.wrapper : ''
            }
            `}
          >
            Image Watermarker
          </h1>
        </div>
        <p className={styles.description}>
          <input
            type="file"
            id="input"
            accept="image/*"
            multiple
            onChange={(e) => handleUploadFiles(e.target.files)}
          />
        </p>

        {files.length > 0 &&
          files.map((file, idx) => (
            <div id={idx}>
              <img
                id={'img' + idx}
                src={URL.createObjectURL(file)}
                className={styles.img}
              ></img>
            </div>
          ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/poyea"
          target="_blank"
          rel="noopener noreferrer"
        >
          dev @poyea - {new Date().getFullYear()}
        </a>
        <hr></hr>

        {files.length == 0 && (
          <img src="https://avatars3.githubusercontent.com/u/24757020"></img>
        )}
      </footer>
      <div className={styles.buttons}>
        <button className={styles.button}>X</button>
        <button className={styles.button}>+</button>
        <button className={styles.button}>A</button>
        <button className={styles.button}>D</button>
      </div>
    </>
  );
};

export default Home;

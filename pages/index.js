import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';

const WATERMARK = 'THIS IS A WATERMARK.';

const Home = () => {
  /*
   * Sticky header hooks.
   */
  const refStickyContainer = useRef(null);
  const [isSticky, setSticky] = useState(false);
  /*
   * Files hooks for processing.
   */
  const [files, setFiles] = useState({});
  const [filesArray, setFilesArray] = useState([]);

  const [isDrawn, setDrawn] = useState(false);

  const addTextToImage = (imagePath, text, id) => {
    let toModifyCanvas = document.getElementById(id);
    let context = toModifyCanvas.getContext('2d');
    let img = new Image();
    img.src = imagePath;
    img.onload = () => {
      toModifyCanvas.width = img.width;
      toModifyCanvas.height = img.height;
      context.drawImage(img, 0, 0);
      context.lineWidth = 1;
      context.fillStyle = 'rgb(0, 140, 255)';
      context.lineStyle = '#ffffff';
      context.font = '50px serif';
      context.fillText(text, 50, 50);
    };
  };

  const handleScroll = () => {
    if (refStickyContainer.current) {
      setSticky(refStickyContainer.current.getBoundingClientRect().top <= 0);
    }
  };

  const applyWaterMark = () => {
    filesArray.forEach((file, idx) => {
      addTextToImage(URL.createObjectURL(file), WATERMARK, idx);
    });
    setDrawn(true);
  };

  const clearDesk = () => {
    setFiles({});
    setFilesArray([]);
    setDrawn(false);
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
    setFiles(files);
    let filesArray = [];
    for (let i = 0; i < files.length; ++i) {
      filesArray.push(files[i]);
    }
    setFilesArray(filesArray);
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

        {filesArray.length > 0 &&
          filesArray.map((file, idx) => (
            <>
              <img
                id={'img' + idx}
                src={URL.createObjectURL(file)}
                className={styles.img + (!isDrawn ? '' : ` ${styles.hidden}`)}
              ></img>
              <canvas
                id={idx}
                key={idx}
                className={styles.img + (!isDrawn ? ` ${styles.hidden}` : '')}
              ></canvas>
            </>
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

        {filesArray.length == 0 && (
          <img src="https://avatars3.githubusercontent.com/u/24757020"></img>
        )}
      </footer>
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
    </>
  );
};

export default Home;

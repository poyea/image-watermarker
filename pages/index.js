import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../components/buttons';
import Dragover from '../components/dragover';
import styles from '../styles/Home.module.css';

const WATERMARK = `Copyright © ${new Date().getFullYear()} J. All Rights Reserved.`.repeat(
  100
);

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

  const [isDragFocus, setDragFocus] = useState(false);

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
      context.font = `${toModifyCanvas.height / 80}px serif`;
      context.rotate(Math.PI / 4);
      context.fillText(text, 0, 0);
      /*
       * Drawings
       */
      for (let mul = -1; mul <= 1; mul += 2) {
        for (
          let xTran = 0, yTran = 0, count = toModifyCanvas.width / 100;
          count >= 2;
          count -= 1
        ) {
          context.save();
          context.translate(xTran, yTran);
          context.fillText(text, 0, 0);
          context.restore();
          yTran -= (toModifyCanvas.height / count) * mul;
        }
      }
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
    for (let i = 0; i < filesArray.length; ++i) {
      let toModifyCanvas = document.getElementById(i);
      let context = toModifyCanvas.getContext('2d');
      context.clearRect(0, 0, toModifyCanvas.width, toModifyCanvas.height);
    }
    setFiles({});
    setFilesArray([]);
    setDrawn(false);
  };

  const downloadImages = () => {
    for (let i = 0; i < filesArray.length; ++i) {
      let link = document.createElement('a');
      const filename = files[i]['name'];
      const extension = filename.substring(filename.lastIndexOf('.') + 1);
      const name = filename.substring(0, filename.lastIndexOf('.'));
      link.download = `${name}_watermarked.${extension}`;
      link.href = document.getElementById(i).toDataURL();
      link.click();
    }
  };

  const handleDragEnter = () => {
    setDragFocus(true);
  };

  const handleDragExit = () => {
    setDragFocus(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    dragover.ondragover = dragover.ondragenter = (evt) => {
      handleDragEnter();
      evt.preventDefault();
    };
    dragover.ondrop = (evt) => {
      handleDragExit();
      input.files = evt.dataTransfer.files;
      handleUploadFiles(evt.dataTransfer.files);
      evt.preventDefault();
    };
    dragover.ondragexit = dragover.ondragend = dragover.ondragleave = (evt) => {
      handleDragExit();
      evt.preventDefault();
    };
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
      <main className={styles.main} id="main">
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
            <div key={idx}>
              <img
                id={'img' + idx}
                src={URL.createObjectURL(file)}
                className={styles.img + (!isDrawn ? '' : ` ${styles.hidden}`)}
              ></img>
              <canvas
                id={idx}
                className={styles.img + (!isDrawn ? ` ${styles.hidden}` : '')}
              ></canvas>
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
        <a
          href="https://github.com/poyea"
          target="_blank"
          rel="noopener noreferrer"
        >
          {filesArray.length == 0 && (
            <img src="https://avatars3.githubusercontent.com/u/24757020"></img>
          )}
        </a>
      </footer>
      <Dragover isDragFocus={isDragFocus} />
      <Buttons
        clearDesk={clearDesk}
        applyWaterMark={applyWaterMark}
        downloadImages={downloadImages}
      />
    </>
  );
};

export default Home;

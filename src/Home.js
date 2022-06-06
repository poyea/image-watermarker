import React, { useEffect, useRef, useState } from 'react';
import Buttons from './components/Buttons';
import Dragover from './components/Dragover';
import styles from './styles/Home.module.css';
import { addTextToImage } from './core/drawTexts';
import { WATERMARK_STRING, WATERMARK_FILLSTYLE } from './core/constants';
import useLocalStorage from 'use-local-storage';
import { saveAs } from 'file-saver';

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

  const [localWaterMark, setLocalWaterMark] = useState(WATERMARK_STRING);

  const [localColor, setLocalColor] = useState(WATERMARK_FILLSTYLE);

  const [rotateCnt, setRotateCnt] = useState(0);

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  const handleScroll = () => {
    if (refStickyContainer.current) {
      setSticky(refStickyContainer.current.getBoundingClientRect().top < -50);
    }
  };

  const rotateWatermark = () => {
    filesArray.forEach((file, idx) => {
      addTextToImage(
        URL.createObjectURL(file),
        localWaterMark,
        localColor,
        idx,
        rotateCnt
      );
    });
    setRotateCnt(rotateCnt + 1);
    setDrawn(true);
  };

  const applyWaterMark = () => {
    filesArray.forEach((file, idx) => {
      addTextToImage(
        URL.createObjectURL(file),
        localWaterMark,
        localColor,
        idx
      );
    });
    setDrawn(true);
  };

  const clearDesk = () => {
    for (let i = 0; i < filesArray.length; ++i) {
      let toModifyCanvas = document.getElementById(i);
      let context = toModifyCanvas.getContext('2d');
      context.clearRect(0, 0, toModifyCanvas.width, toModifyCanvas.height);
    }
    document.getElementById('input').value = '';
    setFiles({});
    setFilesArray([]);
    setDrawn(false);
  };

  const downloadImages = () => {
    for (let i = 0; i < filesArray.length && isDrawn; ++i) {
      const filename = files[i]['name'];
      const extension = filename.substring(filename.lastIndexOf('.') + 1);
      const name = filename.substring(0, filename.lastIndexOf('.'));
      document.getElementById(i).toBlob((blob) => {
        saveAs(blob, `${name}_watermarked.${extension}`);
      });
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
    window.addEventListener('dragover', (evt) => {
      handleDragEnter();
      evt.preventDefault();
    });
    window.addEventListener('dragover', (evt) => {
      handleDragEnter();
      evt.preventDefault();
    });
    window.addEventListener('drop', (evt) => {
      handleDragExit();
      setFiles(evt.dataTransfer.files);
      handleUploadFiles(evt.dataTransfer.files);
      evt.preventDefault();
    });
    window.addEventListener('dragleave', (evt) => {
      handleDragExit();
      evt.preventDefault();
    });
    document.title = 'Image Watermarker';
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

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

  const darkenPage = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleInput = (value) => {
    setLocalWaterMark(value);
  };

  const handleColor = (value) => {
    setLocalColor(value);
  };

  useEffect(() => {
    setDrawn(false);
  }, [filesArray]);

  return (
    <>
      <main className={styles.main} id="main" data-theme={theme}>
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
            👓 Image Watermarker 👓
          </h1>
        </div>
        <p
          className={`${
            isSticky ? styles.stickydescription + ' ' + styles.description : ''
          }`}
        >
          <input
            type="file"
            id="input"
            files={filesArray}
            accept="image/*"
            multiple
            onChange={(e) => handleUploadFiles(e.target.files)}
          />
          <br />
          <input
            className={styles.input}
            type="text"
            value={localWaterMark}
            onChange={(v) => handleInput(v.target.value)}
          ></input>
          <input
            className={styles.color}
            type="color"
            value={localColor}
            onChange={(v) => handleColor(v.target.value)}
          ></input>
        </p>
        {filesArray.length > 0 &&
          filesArray.map((file, idx) => (
            <div key={idx}>
              <img
                id={'img' + idx}
                alt={file['name']}
                title={file['name']}
                src={URL.createObjectURL(file)}
                className={styles.img + (!isDrawn ? '' : ` ${styles.hidden}`)}
              ></img>
              <canvas
                id={idx}
                title={`Watermarked: ${file['name']}`}
                className={styles.img + (!isDrawn ? ` ${styles.hidden}` : '')}
              ></canvas>
            </div>
          ))}
        {filesArray.length === 0 && (
          <>
            <Dragover isDragFocus={isDragFocus} />
            <footer className={styles.footer}>
              <a
                href="https://github.com/poyea"
                target="_blank"
                rel="noopener noreferrer"
              >
                dev @poyea - {new Date().getFullYear()}
              </a>
            </footer>
          </>
        )}
        <Buttons
          rotateWatermark={rotateWatermark}
          clearDesk={clearDesk}
          applyWaterMark={applyWaterMark}
          downloadImages={downloadImages}
          darkenProps={{
            darkenPage,
            theme,
          }}
        />
      </main>
    </>
  );
};

export default Home;

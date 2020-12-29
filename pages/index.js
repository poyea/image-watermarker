import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [files, setFilesState] = useState([]);

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
    <div className={styles.container}>
      <Head>
        <title>Image Watermarker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Image Watermarker</h1>

        <p className={styles.description}>
          <input
            type="file"
            id="input"
            multiple
            onChange={(e) => handleUploadFiles(e.target.files)}
          />
        </p>

        {files.length > 0 &&
          files.map((file) => (
            <div>
              <img src={URL.createObjectURL(file)} className={styles.img}></img>
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
      </footer>
    </div>
  );
};

export default Home;

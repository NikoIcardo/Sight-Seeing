// Niko Icardo 8/18/21
import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const fileSelectRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedHandler = (event) => {
    let selectedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      selectedFile = event.target.files[0];
      setFile(selectedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    console.log(fileIsValid);
    props.onInput(props.id, selectedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    fileSelectRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={fileSelectRef}
        onChange={selectedHandler}
      ></input>
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewURL && <img src={previewURL} alt="Preview" />}
          {!previewURL && <p>{props.text}</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          SELECT IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;

// Niko Icardo 8/18/21 
import React, { useRef } from 'react'; 

import Button from './Button';
import './ImageUpload.css'; 

const ImageUpload = props => {
  const fileSelectRef = useRef();

  const pickedHandler = event => {
    console.log(event.target);
  };

  const pickImageHandler = () => {
    fileSelectRef.current.click();
  };

  return (
    <div className="form-control">
      <input id={props.id} style={{display: 'none'}} type="file" accept=".jpg,.png,.jpeg" ref={fileSelectRef} onChange={pickedHandler}></input>
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  ); 
}; 


export default ImageUpload; 
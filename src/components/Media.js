import React from 'react';
import '../App.css'

const Media = (props) => {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
            current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        props.fetchMedia(uploadedImage.current.file.name);
    };

    return (
        <div className="media-container">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{ display: "none" }}
            />
            <div className="media-uploader" onClick={() => imageUploader.current.click()}>Add Photo or GIF</div>
            {props.renderTagButton()}
            {props.renderTags()}
            <div className="media-preview-container">
                <img className="media-preview" alt="" ref={uploadedImage} src={props.media ? props.media : null}/>
            </div>
        </div>
    );
}

export default Media;
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
                props.fetchMedia(uploadedImage.current.getAttribute('src'));
            };
            reader.readAsDataURL(file);
        }
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
                <img className="media-preview" alt="" ref={uploadedImage} src={props.media ? props.media : 'http://placehold.jp/ffffff/000000/150x150.png'} />
                <span>Media Preview</span>
            </div>
        </div>
    );
}

export default Media;
import { ReactComponent as ImagePreviewIcon } from "../icons/image-preview.svg";

import "./ImageWrapper.scss";

interface Props {
  imageUrl?: string;
}

const ImageWrapper = ({ imageUrl = "" }: Props): JSX.Element => {
  return (
    <div className="image-wrapper">
      {imageUrl ? (
        <img src={imageUrl} alt="can not load image" />
      ) : (
        <div className="image-wrapper-text">
          <ImagePreviewIcon />
          <div>
            <h3>Image preview</h3>
            <span className="image-wrapper-text-desc">
              You should see your image here. <br />
              If image can not be displayed, <br /> there might be an issue with
              image URL.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;

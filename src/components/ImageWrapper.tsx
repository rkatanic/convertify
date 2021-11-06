import "./ImageWrapper.scss";

interface Props {
  imageUrl?: string;
}

const ImageWrapper = ({ imageUrl = "" }: Props): JSX.Element => {
  return (
    <div className="image-wrapper">
      {imageUrl ? (
        <img src={imageUrl} alt="can not load image" className="image" />
      ) : (
        <div className="image-wrapper-text">
          <span>
            Supported image formats: <b> jpg, png, bmp, pbm</b>.
          </span>
          <span> You should see your image here.</span>
          <span>
            If image can not be displayed, there might be an issue with image
            URL.
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;

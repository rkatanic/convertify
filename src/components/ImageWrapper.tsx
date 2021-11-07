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
          <div>
            Supported image formats: <b> jpg, png, bmp, pbm</b>.
          </div>
          <div> You should see your image here.</div>
          <div>
            If image can not be displayed, there might be an issue with image
            URL.
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;

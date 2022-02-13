import ImageWrapper from "./ImageWrapper";

import "./OCRByLink.scss";

interface Props {
  setImage: (value: string) => void;
  image: string;
}

const OCRByLink = ({ setImage, image }: Props): JSX.Element => {
  return (
    <div className="ocr-by-link">
      <input
        type="text"
        placeholder="Enter image URL ..."
        className="ocr-by-link-input"
        value={image}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImage(e.target.value)
        }
      />
      <ImageWrapper imageUrl={image} />
    </div>
  );
};

export default OCRByLink;

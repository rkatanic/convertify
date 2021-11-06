import Button from "./Button";

import "./TextWrapper.scss";

interface Props {
  text?: string;
}

const TextWrapper = ({ text = "" }: Props) => {
  return (
    <div className="text-wrapper">
      <textarea
        readOnly={true}
        value={text}
        placeholder="Your converted text will appear here..."
      />
      <Button
        text="Copy text"
        onClick={() => {
          navigator.clipboard.writeText(text);
          alert("Text copied successfully!");
        }}
      />
    </div>
  );
};
export default TextWrapper;

import "./TextWrapper.scss";

interface Props {
  text?: string;
}

const TextWrapper = ({ text = "" }: Props) => {
  return <textarea className="text-wrapper" readOnly={true} value={text} />;
};
export default TextWrapper;

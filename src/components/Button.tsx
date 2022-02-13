import "./Button.scss";

interface Props {
  text: string | JSX.Element;
  onClick: () => void;
  props?: any;
}

const Button = ({ text, onClick, ...props }: Props): JSX.Element => {
  return (
    <button {...props} className="btn-outline" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

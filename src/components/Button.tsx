import "./Button.scss";

interface Props {
  text: string;
  onClick: () => void;
  props?: any;
}

const Button = ({ text, onClick, ...props }: Props): JSX.Element => (
  <button {...props} className="button" type="button" onClick={onClick}>
    {text}
  </button>
);

export default Button;

import "./Button.scss";

interface Props {
  text: string | JSX.Element;
  onClick: () => void;
  props?: any;
  fullWidth?: boolean;
}

const Button = ({ text, onClick, fullWidth, ...props }: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={`btn ${fullWidth ? "btn-full-width" : ""}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

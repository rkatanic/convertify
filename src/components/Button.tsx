import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import "./Button.scss";

interface Props {
  text: string | JSX.Element;
  onClick: () => void;
  props?: any;
}

const Button = ({ text, onClick, ...props }: Props): JSX.Element => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <button
      {...props}
      className={isDarkTheme ? `button-outline` : "button"}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

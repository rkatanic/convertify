import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import "./IconButton.scss";

interface Props {
  icon: JSX.Element;
  onClick: () => void;
  props?: any;
}

const IconButton = ({ icon, onClick, ...props }: Props): JSX.Element => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <button {...props} className="icon-button" type="button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;

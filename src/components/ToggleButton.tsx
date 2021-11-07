import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { ReactComponent as MoonIcon } from "../icons/planet.svg";

import "./ToggleButton.scss";

const ToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="toggle-switch" onClick={toggleTheme}>
      <input
        readOnly={true}
        type="checkbox"
        className="checkbox"
        checked={isDarkTheme}
      />
      <label className="label">
        <span className="inner" />
        <MoonIcon className="switch" />
      </label>
    </div>
  );
};
export default ToggleButton;

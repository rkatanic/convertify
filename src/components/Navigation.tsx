import ToggleButton from "./ToggleButton";

import "./Navigation.scss";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Navigation = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="navigation">
      <h2>
        <span className="header">Convert</span>
        <span className={isDarkTheme ? `header-primary` : `header-secondary`}>
          Everything
        </span>
      </h2>

      <div className="navigation-links">
        <div className="navigation-link">OCR Converter</div>
        <div className="navigation-link">About</div>

        <div className="theme-button">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Navigation;

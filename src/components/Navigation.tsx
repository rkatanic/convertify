import ToggleButton from "./ToggleButton";

import "./Navigation.scss";

const Navigation = () => (
  <div className="navigation">
    <h2>
      <span className="header-primary">Convert</span>
      <span className="header-secondary">Everything</span>
    </h2>
    <div>https://tesseract.projectnaptha.com/img/eng_bw.png</div>

    <div className="navigation-links">
      <div className="navigation-link">OCR Converter</div>
      <div className="navigation-link">About</div>

      <div className="theme-button">
        <ToggleButton />
      </div>
    </div>
  </div>
);

export default Navigation;

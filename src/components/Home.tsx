import { NavLink } from "react-router-dom";
import { LANGUAGES } from "../constants/languages";

import "./Home.scss";

const Home = (): JSX.Element => {
  return (
    <div className="home">
      <h2 className="home-title">Convertify</h2>
      <p className="home-description">Set of simple converter tools</p>

      <div className="converters">
        <NavLink to="/ocr-converter" className="converter-card">
          <h3>Image to text</h3>
          <p>
            Extracts text from images. Supports {LANGUAGES.length} languages.
          </p>
        </NavLink>

        <NavLink to="/cyrilic-to-latin" className="converter-card">
          <h3>Cyrilic to latin</h3>
          <p>Converts cyrilic text into latin and vice versa.</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;

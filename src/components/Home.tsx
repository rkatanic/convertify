import { NavLink } from "react-router-dom";
import { LANGUAGES } from "../constants/languages";
import IconButton from "./IconButton";
import { ReactComponent as AbstractLinesOne } from "../icons/abstract-line-one.svg";
import { ReactComponent as AbstractLinesTwo } from "../icons/abstract-line-two.svg";
import { ReactComponent as ArrowRightIcon } from "../icons/arrow-right.svg";

import "./Home.scss";

const Home = (): JSX.Element => (
  <div className="home">
    <h2 className="home-title">Convertify</h2>
    <p className="home-description">Set of simple converter tools</p>

    <div className="converters">
      <NavLink to="/ocr-converter" className="converter-card">
        <IconButton icon={<ArrowRightIcon />} />
        <AbstractLinesOne />
        <div>
          <h2>Image to text</h2>
          <p>
            Extracts text from images. <br /> Supports {LANGUAGES.length}{" "}
            languages.
          </p>
        </div>
      </NavLink>

      <NavLink to="/cyrilic-to-latin" className="converter-card">
        <IconButton icon={<ArrowRightIcon />} />
        <AbstractLinesTwo />
        <div>
          <h2>Cyrilic to latin</h2>
          <p>
            Converts cyrilic letters <br /> into latin letters.
          </p>
        </div>
      </NavLink>
    </div>
  </div>
);

export default Home;

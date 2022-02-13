import { useContext } from "react";
import ImageToTextConverter from "./components/ImageToTextConverter";
import ThemeContext from "./context/ThemeContext";

import "./App.scss";

const App = (): JSX.Element => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div className={isDarkTheme ? `App-dark` : `App-light`}>
      <ImageToTextConverter />
    </div>
  );
};

export default App;

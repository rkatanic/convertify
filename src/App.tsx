import { useContext } from "react";
import URLInput from "./components/URLInput";
import ThemeContext from "./context/ThemeContext";

import "./App.scss";

const App = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div className={isDarkTheme ? `App-dark` : `App-light`}>
      <URLInput />
    </div>
  );
};

export default App;

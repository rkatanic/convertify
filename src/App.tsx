import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ImageToTextConverter from "./components/ImageToTextConverter";
import CyrilicToLatinConverter from "./components/CyrilicToLatinConverter";

import "./App.scss";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ocr-converter" element={<ImageToTextConverter />} />
          <Route
            path="/cyrilic-to-latin"
            element={<CyrilicToLatinConverter />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

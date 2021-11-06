import URLInput from "./components/URLInput";
import Particles from "react-tsparticles";
import { particlesConfig } from "./config/particlesConfig";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Particles params={particlesConfig} />
      <URLInput />
    </div>
  );
};

export default App;

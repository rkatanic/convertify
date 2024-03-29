import ImageToTextConverter from "./components/ImageToTextConverter";

const App = (): JSX.Element => (
  <div className="App min-h-screen relative h-full flex bg-neutral-900">
    <ImageToTextConverter />
    <a
      className="text-neutral-500 text-sm absolute bottom-5 left-1/2 translate-x-[-50%] hover:text-blue-400"
      href="https://github.com/rkatanic"
      target="_blank"
      rel="noreferrer"
    >
      Radivoje Katanic
    </a>
  </div>
);

export default App;

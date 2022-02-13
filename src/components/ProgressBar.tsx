import "./ProgressBar.scss";
interface Props {
  progress?: number;
}
const ProgressBar = ({ progress = 0 }: Props): JSX.Element => (
  <div className="progress-bar-container">
    <p className="progress-bar-txt">
      Converting: {Math.round(progress * 100)}%
    </p>
    <div className="progress-bar">
      <div
        style={{ width: `${progress * 100}%` }}
        className="progress-bar-line"
      ></div>
    </div>
  </div>
);

export default ProgressBar;

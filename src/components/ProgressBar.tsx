import "./ProgressBar.scss";

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props): JSX.Element => (
  <div className="progress-bar-container">
    <span className="progress-bar-container-progress">
      {Math.round(progress * 100)}%
    </span>
    <div className="progress-bar">
      <div className="progress-bar-line"></div>
    </div>
    <p className="progress-bar-txt">Converting in progress</p>
  </div>
);

export default ProgressBar;

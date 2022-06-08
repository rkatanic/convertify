import "./ProgressBar.scss";

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props): JSX.Element => (
  <div className="progress-bar-container">
    <div className="progress-bar">
      <div
        style={{ width: `${progress * 100}%` }}
        className="progress-bar-line"
      >
        <div className="progress-bar-line-progress">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </div>
    <p className="progress-bar-txt">Converting...</p>
  </div>
);

export default ProgressBar;

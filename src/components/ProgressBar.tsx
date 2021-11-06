import "./ProgressBar.scss";
interface Props {
  progress?: number;
}
const ProgressBar = ({ progress = 0 }: Props): JSX.Element => (
  <div className="progress-bar-container">
    <div style={{ width: `${progress * 100}%` }} className="progress-bar"></div>
  </div>
);

export default ProgressBar;

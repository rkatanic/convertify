import "./IconButton.scss";

interface Props {
  icon: JSX.Element;
  onClick: () => void;
  props?: any;
  label?: string;
}

const IconButton = ({ icon, onClick, label, ...props }: Props): JSX.Element => {
  return (
    <div className="icon-button-container">
      {label && <span className="icon-button-tooltip">{label}</span>}
      <button
        {...props}
        className="icon-button"
        type="button"
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
};

export default IconButton;

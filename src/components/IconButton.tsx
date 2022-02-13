import "./IconButton.scss";

interface Props {
  icon: JSX.Element;
  onClick: () => void;
  props?: any;
  label?: string;
  labelPosition?: "left" | "right";
}

const IconButton = ({
  icon,
  onClick,
  label,
  labelPosition = "right",
  ...props
}: Props): JSX.Element => {
  return (
    <div className="icon-button-container">
      {label && (
        <span
          className={`icon-button-tooltip icon-button-tooltip-${labelPosition}`}
        >
          {label}
        </span>
      )}
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

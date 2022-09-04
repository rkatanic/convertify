import "./IconButton.scss";

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
  props?: any;
  label?: string;
}

const IconButton = ({ icon, onClick, label, ...props }: Props): JSX.Element => {
  return (
    <div className="relative">
      <button {...props} type="button" onClick={onClick}>
        {icon}
      </button>
      {label && (
        <span className="absolute hidden bg-gray-800 text-white rounded p-1.5 px-3 text-xs -left-9 bottom-8 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

export default IconButton;

import "./IconButton.scss";

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
  props?: any;
  label?: string;
}

const IconButton = ({ icon, onClick, label, ...props }: Props): JSX.Element => (
  <div className="relative">
    <button
      className="bg-neutral-700 hover:bg-emerald-800 p-3 rounded"
      {...props}
      type="button"
      onClick={onClick}
    >
      {icon}
    </button>
    {label && (
      <span className="absolute hidden bg-white text-black font-medium rounded p-1.5 px-3 text-xs -left-6 bottom-12 whitespace-nowrap">
        {label}
      </span>
    )}
  </div>
);

export default IconButton;

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
      <span className="absolute hidden bg-white text-black font-medium rounded p-1.5 px-3 text-xs -left-6 bottom-14 whitespace-nowrap before:absolute before:w-3.5 before:h-1.5 before:bg-white before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2">
        {label}
      </span>
    )}
  </div>
);

export default IconButton;

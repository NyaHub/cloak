import classes from  './ActionButton.module.css'

interface ActionButtonProps {
  className?: string;
  label: string;
  icon: JSX.Element;
}

export const ActionButton = ({ className, label, icon }: ActionButtonProps) => {
  return (
    <button className={`${classes.actionButton} ${className}`}>
      {icon} {label}
    </button>
  );
};
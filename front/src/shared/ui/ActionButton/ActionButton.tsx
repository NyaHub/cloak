import classes from  './ActionButton.module.css'
import { memo } from 'react';

interface ActionButtonProps {
  className?: string;
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
}

export const ActionButton = memo(({ className, label, icon, onClick }: ActionButtonProps) => {
  return (
    <button className={`${classes.actionButton} ${className}`} onClick={onClick}>
      {icon} {label}
    </button>
  );
});


import { Switch } from '@headlessui/react';
import classes from './Switch.module.css';

interface SwitchCustomProps {
    enabled: boolean;
    setEnabled: () => void;
}

export const SwitchCustom: React.FC<SwitchCustomProps> = ({ enabled, setEnabled }) => {

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${classes.switch} group`}
    >
      <span
        aria-hidden="true"
        // className={classes.slider}
        className={`${classes.slider} ${enabled ? classes.checked : ''}`}
      />
    </Switch>
  );
}
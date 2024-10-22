import { Checkbox } from '@headlessui/react'
import { Check } from 'lucide-react'
import classes from  './Checkbox.module.css'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface CheckboxCustomProps {
  className?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxCustom: React.FC<CheckboxCustomProps> = ({ className, checked, onChange }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(checked);
  }, [checked]);

  const handleChange = (value: boolean) => {
    setEnabled(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Checkbox
      checked={enabled}
      onChange={() => handleChange(!enabled)}
      className={({ checked }) => clsx(classes.checkbox, className, { [classes.checked]: checked })}
    >
      <Check className={classes.check} />
    </Checkbox>
  );
};

export default CheckboxCustom;
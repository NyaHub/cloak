import { Checkbox } from '@headlessui/react'
import { Check } from 'lucide-react'
import  * as cls from  './Checkbox.module.scss'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface CheckboxCustomProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxCustom: React.FC<CheckboxCustomProps> = ({ checked, onChange }) => {
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
      className={({ checked }) => clsx(cls.checkbox, { [cls.checked]: checked })}
    >
      <Check className={cls.check} />
    </Checkbox>
  );
};

export default CheckboxCustom;
import { ChangeEvent, useMemo } from 'react';
import classes from  './Select.module.css'
import { ChevronDown } from 'lucide-react';

export interface SelectOption <T extends string>{
  value: T;
  content: string;
}

interface SelectProps <T extends string>{
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { 
    className,
    label,
    options,
    onChange,
    value,
    disabled,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  }

  const optionList = useMemo(() => {
    return options?.map(opt => (
      <option
        className={classes.option}
        value={opt.value}
        key={opt.value}
      >
        {opt.content}
      </option>
    ))
  }, [options])
  return (
    <div className={`${classes.Wrapper} ${className}`}>
      {label && (
        <span className={classes.label}>
          {label}
        </span>
      )}
       <div className={classes.selectContainer}>
      <select
        className={classes.select}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
      >
        {optionList}
      </select>
      <span className={classes.arrow}><ChevronDown size={14}/></span>
       </div>
    </div>
  )
}
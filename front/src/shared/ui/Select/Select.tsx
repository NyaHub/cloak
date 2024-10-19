import { ChangeEvent, useMemo } from 'react';
import classes from  './Select.module.css'

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
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { 
    className,
    label,
    options,
    onChange,
    value,
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
      <select
        className={classes.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  )
}
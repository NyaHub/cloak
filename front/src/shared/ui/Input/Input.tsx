import classes from './Input.module.css';
import { InputHTMLAttributes, memo } from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value = '',
    onChange,
    type = 'text',
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }
 
  return (
    <div>
      <input
        className={`${classes.Input} ${className}`} 
        type={type} 
        value={value}
        onChange={onChangeHandler}
        {...otherProps}
      />
    </div>
  )
})
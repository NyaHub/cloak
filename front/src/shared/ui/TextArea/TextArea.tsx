import { TextareaHTMLAttributes } from 'react';
import classes from  './TextArea.module.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ className, placeholder, ...props }) => {
    return (
        <textarea 
          className={`${classes.textArea} ${className}`}
          placeholder={placeholder}
          {...props} 
        />
    );
};

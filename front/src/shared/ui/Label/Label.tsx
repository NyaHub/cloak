import React from 'react';
import classes from  './Label.module.css'

interface LabelProps {
  title: string; // Заголовок, который будет отображён
}

export const Label: React.FC<LabelProps> = ({ title }) => {
  return (
    <div className={classes.Label}>
      <p className={classes.title}>{title}</p> {/* Отображаем заголовок */}
    </div>
  );
};

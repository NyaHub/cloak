import React from 'react';
import  * as cls from  './Label.module.scss'

interface LabelProps {
  title: string; // Заголовок, который будет отображён
}

export const Label: React.FC<LabelProps> = ({ title }) => {
  return (
    <div className={cls.Label}>
      <p className={cls.title}>{title}</p> {/* Отображаем заголовок */}
    </div>
  );
};

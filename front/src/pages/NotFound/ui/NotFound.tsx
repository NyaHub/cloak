import classes from './NotFound.module.css';

interface NotFoundProps {
    className?: string 
}

export const NotFound = ({className}: NotFoundProps) => {
  return (
    <div className={`${classes.NotFound} ${className}`}>
      Страница не найдена
    </div>
  )
}
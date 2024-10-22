import { Loader } from '@/shared/ui/Loader/Loader'
import classes from  './Loader.module.css'

interface PageLoaderProps {
    className?: string 
}

export const PageLoader = ({className}: PageLoaderProps) => {
 
  return (
    <div className={`${classes.PageLoader} ${className}`}>
      <Loader />
    </div>
  )
}
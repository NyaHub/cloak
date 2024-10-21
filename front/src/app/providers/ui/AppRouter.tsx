import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from '../config/routeConfig';
import { PageLoader } from '@/widgetes/PageLoader';

const AppRouter = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
               {Object.values(routeConfig).map(({element, path}) => (
                 <Route 
                   key={path}
                   element={element}
                   path={path}
                 />
               ))}
            </Routes>

        </Suspense>
    )
}

export default memo(AppRouter);
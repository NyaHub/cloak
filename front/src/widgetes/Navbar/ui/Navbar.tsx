import { NavLink, useNavigate } from 'react-router-dom'
import classes from './Navbar.module.css'
import clsx from 'clsx'
import { LogOut } from 'lucide-react';
import { RoutePath } from '@/app/providers/config/routeConfig';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Логика для выхода из системы
        navigate('/');
    };

   return (
    <nav className={classes.Navbar}>
        <div>
           <NavLink 
                to={RoutePath.campaigns}
                className={({ isActive }) => clsx(classes.linkNav, { [classes.active]: isActive })}
            >
                Campaigns
            </NavLink>
            <NavLink 
                to={RoutePath.create_campaign}
                className={({ isActive }) => clsx(classes.linkNavTwo, { [classes.active]: isActive  })}
            >
                Create campaign
            </NavLink>
        </div>
         <button onClick={handleLogout} className={classes.btnNav}>
             <LogOut width={20} height={20} className={classes.icon}/>
                Log out
        </button>
    </nav>
   )
}
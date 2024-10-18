import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
import clsx from 'clsx'
import { LogOut } from 'lucide-react';
import { RoutePath } from '@/app/providers/config/routeConfig';

export const Navbar = () => {

    const handleLogout = () => {
        // Логика для выхода из системы
        console.log('Logout');
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
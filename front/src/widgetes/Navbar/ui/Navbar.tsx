import { NavLink } from 'react-router-dom'
import * as cls from './Navbar.module.scss'
import clsx from 'clsx'
import { LogOut } from 'lucide-react';
import { RoutePath } from '@/app/providers/config/routeConfig';

export const Navbar = () => {

    const handleLogout = () => {
        // Логика для выхода из системы
        console.log('Logout');
    };

   return (
    <nav className={cls.Navbar}>
        <div>
           <NavLink 
                to={RoutePath.campaigns}
                className={({ isActive }) => clsx(cls.linkNav, { [cls.active]: isActive })}
            >
                Campaigns
            </NavLink>
            <NavLink 
                to={RoutePath.create_campaign}
                className={({ isActive }) => clsx(cls.linkNavTwo, { [cls.active]: isActive  })}
            >
                Create campaign
            </NavLink>
        </div>
         <button onClick={handleLogout} className={cls.btnNav}>
             <LogOut width={20} height={20} className={cls.icon}/>
                Log out
        </button>
    </nav>
   )
}
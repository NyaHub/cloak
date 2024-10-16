import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import clsx from 'clsx'
import { LogOut } from 'lucide-react';
import { RoutePath } from '@/app/providers/config/routeConfig';

export const Navbar = () => {

    const handleLogout = () => {
        // Логика для выхода из системы
        console.log('Logout');
    };

   return (
    <nav className='Navbar'>
        <div>
           <NavLink 
                to={RoutePath.campaigns}
                className={({ isActive }) => clsx('linkNav', { 'active': isActive })}
            >
                Campaigns
            </NavLink>
            <NavLink 
                to={RoutePath.create_campaign}
                className={({ isActive }) => clsx('linkNav-2', { 'active': isActive })}
            >
                Create campaign
            </NavLink>
        </div>
         <button onClick={handleLogout} className='btnNav'>
             <LogOut width={20} height={20}/>
                Log out
        </button>
    </nav>
   )
}
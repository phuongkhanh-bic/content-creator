import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { home, compass, person } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
    const history = useHistory();
    const location = useLocation();

    const navigationItems = [
        {
            title: 'Home',
            icon: home,
            route: AppRoutes.Newsfeed,
            isActive: location.pathname === AppRoutes.Newsfeed
        },
        {
            title: 'Explore',
            icon: compass,
            route: AppRoutes.Explore,
            isActive: location.pathname === AppRoutes.Explore
        },
        {
            title: 'Profile',
            icon: person,
            route: AppRoutes.Profile,
            isActive: location.pathname === AppRoutes.Profile
        }
    ];

    const handleNavigation = (route: string) => {
        history.push(route);
    };

    return (
        <div className={`app-sidebar ${className}`}>
        <div className="p-6">
            <h1 className="text-2xl font-bold text-black mb-8">ContentCreator</h1>
            
            <IonList className="bg-transparent">
            {navigationItems.map((item) => (
                <IonItem
                key={item.title}
                button
                onClick={() => handleNavigation(item.route)}
                className={`nav-item mb-2 rounded-lg ${
                    item.isActive 
                    ? 'bg-gray-100 text-black font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                lines="none"
                >
                <IonIcon 
                    icon={item.icon} 
                    slot="start" 
                    className={`text-2xl ${item.isActive ? 'text-black' : 'text-gray-600'}`}
                />
                <IonLabel className="ml-4 text-base">{item.title}</IonLabel>
                </IonItem>
            ))}
            </IonList>
        </div>
        </div>
    );
    };

export default Sidebar;

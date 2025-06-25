import React from 'react';
import { IonIcon } from '@ionic/react';
import { home, compass, person } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { useDevice } from '@/hooks/use_device';

interface BottomTabBarProps {
    className?: string;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ className = '' }) => {
    const history = useHistory();
    const location = useLocation();
    const { isMobile } = useDevice();

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

    if (!isMobile) {
        return null;
    }

    return (
        <div 
            className={`app-bottom-tabs md:hidden ${className}`}
            style={{
                height: 'auto',
                minHeight: '64px',
                paddingTop: '8px',
                paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
        {navigationItems.map((item) => (
            <button
                key={item.title}
                onClick={() => handleNavigation(item.route)}
                className={`nav-item flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                    item.isActive ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
                <IonIcon 
                    icon={item.icon} 
                    className={`text-2xl mb-1 ${item.isActive ? 'text-black' : 'text-gray-500'}`}
                />
                <span className="text-xs">{item.title}</span>
            </button>
        ))}
        </div>
    );
};

export default BottomTabBar; 
import React from 'react';
import Sidebar from './sidebar';
import BottomTabBar from './bottom_tab_bar';
import AdSection from './ad_section';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
    return (
        <div className={`app-layout ${className}`}>
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:block" />
            
            {/* Main Content Area */}
            <div className="app-main">
                <div className="app-content">
                    {children}
                </div>
            </div>
            
            {/* Desktop Right Sidebar (Ads) */}
            <AdSection />
            
            {/* Mobile Bottom Tab Bar */}
            <BottomTabBar />
        </div>
    );
};

export default MainLayout; 
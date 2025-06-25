import React from 'react';

interface AdSectionProps {
    className?: string;
}

const AdSection: React.FC<AdSectionProps> = ({ className = '' }) => {
    return (
        <div className={`app-ads ${className}`}>
            <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Suggested for you</h3>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Sponsored</h3>
            </div>
        </div>
    );
};

export default AdSection; 
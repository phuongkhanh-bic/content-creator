import { IonImg } from '@ionic/react';
import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src = "https://picsum.photos/200/200",
    alt = "avatar",
    size = 'md',
    className
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className={cn(
            "rounded-full overflow-hidden flex-shrink-0",
            sizeClasses[size],
            className
        )}>
            <IonImg
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Avatar; 
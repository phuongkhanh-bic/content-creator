import { cn } from '@/lib/utils';
import { IonButton, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { heart, heartOutline, chatbubbleOutline } from 'ionicons/icons';

interface PostFooterProps {
    isLiked?: boolean;
    onLike?: (isLiked: boolean) => void;
    onComment?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
    isLiked = false,
    onLike,
    onComment,
}) => {
    const [hasLiked, setHasLiked] = useState(isLiked);

    useEffect(() => {
        setHasLiked(isLiked);
    }, [isLiked]);

    const handleLike = () => {
        const newLikedState = !hasLiked;
        setHasLiked(newLikedState);
        
        if (onLike) {
            onLike(newLikedState);
        }
    };

    const handleComment = () => {
        onComment?.();
    };

    return (
        <div className="px-4 pb-3">
            {/* Action Buttons */}
            <div className="flex items-center justify-between py-2">
                <IonButton
                    fill="clear"
                    className="flex-1 text-gray-600 hover:text-blue-500"
                    onClick={handleLike}
                >
                    <IonIcon 
                        icon={hasLiked ? heart : heartOutline} 
                        className={cn("mr-2", hasLiked ? "text-red-500" : "text-gray-600")}
                    />
                    <span className={cn(hasLiked ? "text-red-500" : "text-gray-600")}>
                        {hasLiked ? 'Liked' : 'Like'}
                    </span>
                </IonButton>

                <IonButton
                    fill="clear"
                    className="flex-1 text-gray-600 hover:text-blue-500"
                    onClick={handleComment}
                >
                    <IonIcon icon={chatbubbleOutline} className="mr-2" />
                    <span>Comment</span>
                </IonButton>
            </div>
        </div>
    );
};

export default PostFooter; 
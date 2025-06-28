import { cn } from '@/lib/utils';
import { IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { heart, heartOutline, chatbubbleOutline } from 'ionicons/icons';

interface PostFooterProps {
    initialLikeCount?: number;
    initialCommentCount?: number;
    isLiked?: boolean;
    onLike?: (isLiked: boolean, newCount: number) => void;
    onComment?: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
    initialLikeCount = 0,
    initialCommentCount = 0,
    isLiked = false,
    onLike,
    onComment,
}) => {
    const [hasLiked, setHasLiked] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleLike = () => {
        const newLikedState = !hasLiked;
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
        
        setHasLiked(newLikedState);
        setLikeCount(newLikeCount);
        
        if (onLike) {
            onLike(newLikedState, newLikeCount);
        }
    };

    const handleComment = () => {
        onComment?.();
    };

    return (
        <div className="px-4 pb-3">
            {/* Like and Comment Count */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-1">
                    {likeCount > 0 && (
                        <>
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <IonIcon icon={heart} className="text-white text-xs" />
                            </div>
                            <span className="text-gray-600 text-sm">
                                {likeCount} like{likeCount === 1 ? '' : 's'}
                            </span>
                        </>
                    )}
                </div>
                <div>
                    {initialCommentCount > 0 && (
                        <span className="text-gray-600 text-sm">
                            {initialCommentCount} comment{initialCommentCount === 1 ? '' : 's'}
                        </span>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
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
                        Like
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
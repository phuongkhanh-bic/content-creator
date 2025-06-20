import { cn } from '@/lib/utils';
import { IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { heart, heartOutline, chatbubbleOutline } from 'ionicons/icons';

interface SocialInteractionBarProps {
    initialLikeCount?: number;
    initialCommentCount?: number;
    onLike?: (isLiked: boolean, newCount: number) => void;
    onComment?: () => void;
}

const SocialInteractionBar: React.FC<SocialInteractionBarProps> = ({
    initialLikeCount = 42,
    initialCommentCount = 8,
    onLike,
    onComment,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleLike = () => {
        const newLikedState = !isLiked;
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
        
        setIsLiked(newLikedState);
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
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <IonIcon icon={heart} className="text-white text-xs" />
                    </div>
                    <span className="text-gray-600 text-sm">
                        {likeCount} likes
                    </span>
                </div>
                <span className="text-gray-600 text-sm">
                    {initialCommentCount} comments
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <IonButton
                    fill="clear"
                    className="flex-1 text-gray-600 hover:text-blue-500"
                    onClick={handleLike}
                >
                    <IonIcon 
                        icon={isLiked ? heart : heartOutline} 
                        className={cn("mr-2", isLiked ? "text-red-500" : "text-gray-600")}
                    />
                    <span className={cn(isLiked ? "text-red-500" : "text-gray-600")}>
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

            {/* Comment Input */}
            {/* <div className="flex items-center gap-2 pt-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <IonImg
                        src={userAvatar}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <IonItem className="flex-1 bg-gray-50 rounded-full border-none">
                    <IonInput
                        placeholder="Write a comment..."
                        value={commentText}
                        onIonInput={(e) => setCommentText(e.detail.value || '')}
                        className="text-sm"
                    />
                </IonItem>
                <IonButton
                    fill="clear"
                    className="text-blue-500 hover:text-blue-600"
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                >
                    <IonIcon icon={send} />
                </IonButton>
            </div> */}
        </div>
    );
};

export default SocialInteractionBar; 
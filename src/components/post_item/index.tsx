import { cn } from '@/lib/utils';
import { IonCard, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import SocialInteractionBar from '@/components/social_interaction';
import { AppRoutes } from '@/constants/routes';

interface PostItemProps {
    author?: string;
    avatar?: string;
    content?: string;
    timestamp?: string;
    images?: string[];
    likeCount?: number;
    commentCount?: number;
    isDetailView?: boolean;
    onLike?: (isLiked: boolean, newCount: number) => void;
    onComment?: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
    author = "John Doe",
    avatar = "https://picsum.photos/200/200",
    content = "This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit. This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit. This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit.",
    timestamp = "16/06/2025",
    images = [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/601",
        "https://picsum.photos/800/602",
    ],
    likeCount = 42,
    commentCount = 8,
    isDetailView = false,
    onLike,
    onComment
}) => {
    const history = useHistory();

    const getImageGridClass = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            
            default:
                return "grid-cols-2";
        }
    };

    const handleLike = (isLiked: boolean, newCount: number) => {
        console.log('Post liked:', isLiked, 'New count:', newCount);
        onLike?.(isLiked, newCount);
    };

    const handleComment = () => {
        if (isDetailView) {
            onComment?.();
        } else {
            history.push(AppRoutes.PostDetail);
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on buttons or interactive elements
        const target = e.target as HTMLElement;
        if (target.closest('ion-button') || target.closest('button')) {
            return;
        }
        
        if (!isDetailView) {
            history.push(AppRoutes.PostDetail);
        }
    };

    const postContent = (
        <div className="px-4 py-3">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <IonImg
                        src={avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-700 text-base font-semibold">
                        {author}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {timestamp}
                    </span>
                </div>
            </div>

            <div className="h-3" />

            <p className={cn(
                "text-gray-700 text-base",
                !isDetailView && "line-clamp-2",
                isDetailView && "leading-relaxed"
            )}>
                {content}
            </p>

            {images.length > 0 && (
                <>
                    <div className="h-3" />
                    <div className={cn(
                        "grid gap-1 rounded-lg overflow-hidden",
                        getImageGridClass(images.length)
                    )}>
                        {images.map((image, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    "relative",
                                    images.length === 3 && index === 0 && "row-span-2",
                                    images.length === 4 && "aspect-square"
                                )}
                            >
                                <IonImg
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );

    return (
        <IonCard 
            className={cn(
                "rounded-lg bg-white shadow-md flex flex-col border border-border", 
                isDetailView && "mb-4",
                !isDetailView && "cursor-pointer hover:shadow-lg transition-shadow"
            )}
            onClick={handleCardClick}
        >
            {postContent}

            {/* Social Interaction Bar */}
            <SocialInteractionBar
                initialLikeCount={likeCount}
                initialCommentCount={commentCount}
                onLike={handleLike}
                onComment={handleComment}
            />
        </IonCard>
    );
};

export default PostItem; 
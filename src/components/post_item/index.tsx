import { cn } from '@/lib/utils';
import { IonCard } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import PostHeader from './post_header';
import PostBody from './post_body';
import PostFooter from './post_footer';
import { AppRoutes } from '@/constants/routes';
import { Post } from '@/data/posts';

interface PostItemProps {
    post: Post;
    isDetailView?: boolean;
    onReaction?: (id: number, isLiked: boolean) => void;
    onComment?: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({
    post,
    isDetailView = false,
    onReaction,
    onComment
}) => {
    const history = useHistory();

    const navigateToPostDetail = () => {
        history.push(`${AppRoutes.PostDetail}/${post.id}`);
    }

    const handleLike = (isLiked: boolean, newCount: number) => {
        console.log('Post liked:', isLiked, 'New count:', newCount);
        onReaction?.(post.id, isLiked);
    };

    const handleComment = () => {
        if (isDetailView) {
            onComment?.(post.id);
        } else {
            navigateToPostDetail();
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on buttons or interactive elements
        const target = e.target as HTMLElement;
        if (target.closest('ion-button') || target.closest('button')) {
            return;
        }
        
        if (!isDetailView) {
            navigateToPostDetail();
        }
    };

    return (
        <IonCard 
            className={cn(
                "rounded-lg bg-white shadow-md flex flex-col border border-border", 
                isDetailView && "mb-4",
                !isDetailView && "cursor-pointer hover:shadow-lg transition-shadow"
            )}
            onClick={handleCardClick}
        >
            <div className="px-4 py-3">
                <PostHeader
                    author={post.author}
                    avatar={post.avatar}
                    createdAt={post.createdAt}
                />

                <div className="h-3" />

                <PostBody
                    content={post.content}
                    images={post.images}
                />
            </div>

            <PostFooter
                initialLikeCount={post.likes}
                initialCommentCount={post.comments}
                isLiked={post.isLiked}
                onLike={handleLike}
                onComment={handleComment}
            />
        </IonCard>
    );
};

export default PostItem; 
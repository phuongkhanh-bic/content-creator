import { cn } from '@/lib/utils';
import { IonCard } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import PostHeader from './post_header';
import PostBody from './post_body';
import PostFooter from './post_footer';
import { AppRoutes } from '@/constants/routes';
import { Post } from '@/types/post';

interface PostItemProps {
    post: Post;
    isDetailView?: boolean;
    onReaction?: (id: number, isLiked: boolean) => void;
    onComment?: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({
    post,
    isDetailView = false,
    onReaction,
    onComment,
    onEdit,
    onDelete
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

    const handleEdit = () => {
        onEdit?.(post.id);
    };

    const handleDelete = () => {
        onDelete?.(post.id);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on buttons or interactive elements
        const target = e.target as HTMLElement;
        if (target.closest('ion-button') || target.closest('button') || target.closest('ion-popover') || target.closest('ion-item')) {
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
                    createdAt={post.created_at || ''}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <div className="h-3" />
                <PostBody content={post.content || ''}/>
            </div>

            <PostFooter
                isLiked={post.is_liked}
                onLike={handleLike}
                onComment={handleComment}
            />
        </IonCard>
    );
};

export default PostItem; 
import { IonPage, IonContent, IonAlert } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostItem from '@/components/post_item';
import CommentInput, { CommentInputRef } from '@/components/comment/comment_input';
import { PostDetailHeader, LoadingState, ErrorState, CommentsSection } from './components';
import { getPostById } from '@/services/post';
import useCreateComment from './hooks/useCreateComment';
import { Comment } from '@/types/comment';
import { getCommentsByPostId } from '@/services/comment';
import { AppRoutes } from '@/constants/routes';
import { useDeletePost } from '@/hooks/use_delete_post';
import useLikePost from '@/hooks/use_like_post';

interface RouteParams {
    id: string;
}

const PostDetail = () => {
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const postId = parseInt(id);
    const commentInputRef = useRef<CommentInputRef>(null);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId
    });

    const { data: comments = [] } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getCommentsByPostId(postId),
        enabled: !!postId, // Only run query if postId exists
    });

    const { mutateAsync: createComment, isPending: isCommentPending } = useCreateComment(postId);
    const { likePost } = useLikePost();
    
    const deletePostMutation = useDeletePost({
        redirectTo: AppRoutes.Newsfeed
    });
    
    const handleBack = () => {
        history.goBack();
    };

    const handleReaction = async (id: number, isLiked: boolean) => {
        await likePost(id, isLiked);
    };

    const handleComment = () => {
        commentInputRef.current?.focus();
    };

    const handleEdit = () => {
        history.push(`${AppRoutes.EditPost}?id=${postId}`);
    };

    const handleDelete = () => {
        setIsDeleteAlertOpen(true);
    };

    const confirmDelete = () => {
        deletePostMutation.mutate(postId);
        setIsDeleteAlertOpen(false);
    };

    const cancelDelete = () => {
        setIsDeleteAlertOpen(false);
    };

    const handleSendComment = (commentText: string) => {
        const comment: Partial<Comment> = {
            post_id: postId,
            content: commentText,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        createComment(comment);
    };

    const renderContent = () => {
        if (isLoading) {
            return <LoadingState />;
        }

        if (error || !post) {
            return <ErrorState error={error?.message || 'Post not found'} onBack={handleBack} />;
        }

        return (
            <>
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <PostItem
                        post={post}
                        isDetailView={true}
                        onReaction={handleReaction}
                        onComment={handleComment}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <CommentsSection comments={comments} />
                </div>

                {/* Fixed Comment Input at Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 md:left-64 lg:right-80">
                    <CommentInput 
                        ref={commentInputRef}
                        onSendComment={handleSendComment} 
                        disabled={isCommentPending}
                    />
                </div>
            </>
        )
    }

    return (
        <IonPage className="flex flex-col h-full">
            <PostDetailHeader onBack={handleBack} />
            <IonContent className="bg-gray-50">
                <div className="app-main app-content">
                    {renderContent()}
                </div>    
            </IonContent>

            <IonAlert
                isOpen={isDeleteAlertOpen}
                onDidDismiss={cancelDelete}
                header="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: cancelDelete,
                    },
                    {
                        text: 'Delete',
                        role: 'destructive',
                        handler: confirmDelete,
                    }
                ]}
            />
        </IonPage>
    );
};

export default PostDetail;
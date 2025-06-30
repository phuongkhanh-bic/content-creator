import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import PostItem from '@/components/post_item';
import CommentInput, { CommentInputRef } from '@/components/comment/comment_input';
import { PostDetailHeader, LoadingState, ErrorState, CommentsSection } from './components';
import { useQuery } from '@tanstack/react-query';
import { getPostById } from '@/services/post';
import useCreateComment from './hooks/useCreateComment';
import { Comment } from '@/types/comment';
import { useRef } from 'react';
import { getCommentsByPostId } from '@/services/comment';

interface RouteParams {
    id: string;
}

const PostDetail = () => {
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const postId = parseInt(id);
    const commentInputRef = useRef<CommentInputRef>(null);

    const { data: post, status, error } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPostById(postId)
    })

    const { data: comments = [] } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getCommentsByPostId(postId),
        enabled: !!postId, // Only run query if postId exists
    });
    const { mutateAsync: createComment, isPending: isCommentPending } = useCreateComment(postId);
    
    const handleBack = () => {
        history.goBack();
    };

    const handleComment = () => {
        commentInputRef.current?.focus();
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
        if (status === 'pending') {
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
                        // onReaction={handleLike}
                        onComment={handleComment}
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
        </IonPage>
    );
};

export default PostDetail;
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import PostItem from '@/components/post_item';
import CommentInput from '@/components/comment/comment_input';
import { usePostDetail } from './hooks/usePostDetail';
import { mockComments } from './data/mockComments';
import { PostDetailHeader, LoadingState, ErrorState, CommentsSection } from './components';

interface RouteParams {
    id: string;
}

const PostDetail = () => {
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const postId = parseInt(id);
    
    const { post, loading, error, handleLike } = usePostDetail({ postId });

    const handleBack = () => {
        history.goBack();
    };

    const handleComment = () => {
        console.log('Comment button clicked');
    };

    const handleSendComment = (comment: string) => {
        console.log('Sending comment:', comment);
    };

    const handleLikeComment = (commentId: number) => {
        console.log('Liking comment:', commentId);
    };

    const handleReplyComment = (commentId: number) => {
        console.log('Replying to comment:', commentId);
    };

    const renderContent = () => {
        if (loading) {
            return <LoadingState />;
        }

        if (error || !post) {
            return <ErrorState error={error || 'Post not found'} onBack={handleBack} />;
        }

        return (
            <>
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <PostItem
                            post={post}
                            isDetailView={true}
                            onReaction={handleLike}
                            onComment={handleComment}
                        />

                        <CommentsSection
                            comments={mockComments}
                            onLikeComment={handleLikeComment}
                            onReplyComment={handleReplyComment}
                        />
                    </div>
                </div>

                {/* Fixed Comment Input at Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 md:left-64 lg:right-80">
                    <CommentInput onSendComment={handleSendComment} />
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
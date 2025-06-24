import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { chevronBack } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@/components/button';
import PostItem from '@/components/post_item';
import CommentList from '@/components/comment/comment_list';
import CommentInput from '@/components/comment/comment_input';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
}

interface RouteParams {
    id: string;
}

const PostDetail = () => {
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const postId = parseInt(id);
    
    console.log('PostDetail id', postId);

    // Mock data - in real app, this would come from API based on the ID
    const [post, setPost] = useState({
        id: postId,
        content: `[{"type":"p","id":"97f0FFUqhE","children":[{"text":"This is a detailed post content for post ${postId}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]}]`,
        createdAt: '2021-01-01',
        author: 'John Doe',
        avatar: 'https://picsum.photos/200/200',
        images: ['https://picsum.photos/200/200', 'https://picsum.photos/200/200'],
        likes: 42,
        comments: 3,
        isLiked: false,
    });

    const comments: Comment[] = [
        {
            id: 1,
            author: "Alice Johnson",
            avatar: "https://picsum.photos/200/201",
            content: "This is amazing! Love the content you're sharing.",
            createdAt: "2 hours ago",
            likes: 5
        },
        {
            id: 2,
            author: "Bob Smith",
            avatar: "https://picsum.photos/200/202",
            content: "Great post! Thanks for sharing this information.",
            createdAt: "1 hour ago",
            likes: 3
        },
        {
            id: 3,
            author: "Carol Davis",
            avatar: "https://picsum.photos/200/203",
            content: "I completely agree with your point of view. Well said!",
            createdAt: "30 minutes ago",
            likes: 7
        }
    ];

    const handleBack = () => {
        history.goBack();
    };

    const handleLike = (id: number, isLiked: boolean) => {
        // Update the post's like status and count
        setPost(prevPost => ({
            ...prevPost,
            isLiked: isLiked,
            likes: isLiked ? prevPost.likes + 1 : prevPost.likes - 1
        }));
    };

    const handleComment = () => {
        // Focus on comment input
        console.log('Comment button clicked');
    };

    const handleSendComment = (comment: string) => {
        // TODO: Send comment to API
        console.log('Sending comment:', comment);
    };

    const handleLikeComment = (commentId: number) => {
        // TODO: Handle comment like
        console.log('Liking comment:', commentId);
    };

    const handleReplyComment = (commentId: number) => {
        // TODO: Handle comment reply
        console.log('Replying to comment:', commentId);
    };

    return (
        <IonPage className="flex flex-col h-full bg-background">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <Button fill="clear" color="dark" onClick={handleBack}>
                            <IonIcon icon={chevronBack} />
                        </Button>
                    </IonButtons>
                    <IonTitle>Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto bg-background">
                <div className="ion-padding">
                    <PostItem
                        post={post}
                        isDetailView={true}
                        onReaction={handleLike}
                        onComment={handleComment}
                    />

                    {/* Comments List */}
                    <div className="bg-white rounded-lg shadow-md border border-border mt-4">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <span className="text-gray-700 font-semibold text-base">
                                Comments ({comments.length})
                            </span>
                        </div>
                        <CommentList
                            comments={comments}
                            onLikeComment={handleLikeComment}
                            onReplyComment={handleReplyComment}
                        />
                    </div>
                    
                    {/* Bottom spacing to ensure last comment is visible */}
                    <div className="h-20"></div>
                </div>
            </div>

            {/* Fixed Comment Input at Bottom */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
                <CommentInput
                    onSendComment={handleSendComment}
                />
            </div>
        </IonPage>
    );
};

export default PostDetail;
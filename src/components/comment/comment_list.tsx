import { IonList } from '@ionic/react';
import React from 'react';
import CommentItem from './comment_item';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
}

interface CommentListProps {
    comments: Comment[];
    onLikeComment?: (commentId: number) => void;
    onReplyComment?: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    onLikeComment,
    onReplyComment
}) => {
    return (
        <IonList className="p-0">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLikeComment={onLikeComment}
                    onReplyComment={onReplyComment}
                />
            ))}
        </IonList>
    );
};

export default CommentList; 
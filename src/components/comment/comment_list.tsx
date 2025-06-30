import { IonList } from '@ionic/react';
import React from 'react';
import CommentItem from './comment_item';
import { Comment } from '@/types/comment';

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <IonList className="p-0">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                />
            ))}
        </IonList>
    );
};

export default CommentList; 
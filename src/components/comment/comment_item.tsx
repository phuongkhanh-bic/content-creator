import { IonItem, IonAvatar, IonImg, IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import { heartOutline } from 'ionicons/icons';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
}

interface CommentItemProps {
    comment: Comment;
    onLikeComment?: (commentId: number) => void;
    onReplyComment?: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    onLikeComment,
    onReplyComment
}) => {
    return (
        <IonItem className="px-4 py-3 border-b border-gray-50 last:border-b-0">
            <div className="flex items-start gap-3 w-full">
                <IonAvatar className="w-8 h-8 flex-shrink-0">
                    <IonImg src={comment.avatar} alt={comment.author} />
                </IonAvatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-700 font-semibold text-sm">
                            {comment.author}
                        </span>
                        <span className="text-gray-500 text-xs">
                            {comment.createdAt}
                        </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        {comment.content}
                    </p>
                    <div className="flex items-center gap-4">
                        <IonButton
                            fill="clear"
                            size="small"
                            className="text-gray-500 hover:text-blue-500 h-auto p-0"
                            onClick={() => onLikeComment?.(comment.id)}
                        >
                            <IonIcon icon={heartOutline} className="mr-1 text-xs" />
                            <span className="text-xs">Like</span>
                        </IonButton>
                        <IonButton
                            fill="clear"
                            size="small"
                            className="text-gray-500 hover:text-blue-500 h-auto p-0"
                            onClick={() => onReplyComment?.(comment.id)}
                        >
                            <span className="text-xs">Reply</span>
                        </IonButton>
                        {comment.likes > 0 && (
                            <span className="text-gray-500 text-xs">
                                {comment.likes} likes
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </IonItem>
    );
};

export default CommentItem; 
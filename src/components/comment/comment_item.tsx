import { IonItem } from '@ionic/react';
import React from 'react';
import Avatar from '@/components/avatar';
import { Comment } from '@/types/comment';
import { formatTimeAgo } from '@/lib/utils';

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <IonItem className="px-4 py-3 border-b border-gray-50 last:border-b-0">
            <div className="flex items-start gap-3 w-full">
                <Avatar size="sm" />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-700 font-semibold text-sm">
                            Kilian Jornet
                        </span>
                        <span className="text-gray-500 text-xs">
                            {formatTimeAgo(comment.created_at)}
                        </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.content}
                    </p>
                </div>
            </div>
        </IonItem>
    );
};

export default CommentItem; 
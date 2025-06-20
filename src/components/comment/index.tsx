import React from 'react';
import CommentList from './comment_list';
import CommentInput from './comment_input';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
}

interface CommentsSectionProps {
    comments: Comment[];
    userAvatar?: string;
    onLikeComment?: (commentId: number) => void;
    onReplyComment?: (commentId: number) => void;
    onSendComment: (comment: string) => void;
    disabled?: boolean;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
    comments,
    userAvatar,
    onLikeComment,
    onReplyComment,
    onSendComment,
    disabled = false
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md border border-border">
            <div className="px-4 py-3 border-b border-gray-100">
                <span className="text-gray-700 font-semibold text-base">
                    Comments ({comments.length})
                </span>
            </div>

            <CommentList
                comments={comments}
                onLikeComment={onLikeComment}
                onReplyComment={onReplyComment}
            />

            <div className="px-4 py-3 border-t border-gray-100">
                <CommentInput
                    userAvatar={userAvatar}
                    onSendComment={onSendComment}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default CommentsSection; 
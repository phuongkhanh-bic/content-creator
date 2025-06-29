import React from 'react';
import Avatar from '@/components/avatar';

interface PostHeaderProps {
    createdAt: string;
}

const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks}w`;
    }

    // For older posts, show the actual date
    return postDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
};

const PostHeader: React.FC<PostHeaderProps> = ({
    createdAt
}) => {
    return (
        <div className="flex items-start gap-3">
            <Avatar size="md" />
            <div className="flex flex-col">
                <span className="text-gray-700 text-base font-semibold">
                    {'Kilian Jornet'}
                </span>
                <span className="text-gray-500 text-xs">
                    {formatTimeAgo(createdAt)}
                </span>
            </div>
        </div>
    );
};

export default PostHeader; 
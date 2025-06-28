import React from 'react';
import Avatar from '@/components/avatar';

interface PostHeaderProps {
    createdAt: string;
}

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
                    {createdAt}
                </span>
            </div>
        </div>
    );
};

export default PostHeader; 
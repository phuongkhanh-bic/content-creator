import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@/components/avatar';
import { AppRoutes } from '@/constants/routes';

const CreatePostBar: React.FC = () => {
    const history = useHistory();

    const handleCreatePost = () => {
        history.push(AppRoutes.CreatePost);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center space-x-3">
                <Avatar size="sm" />
                
                <div 
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={handleCreatePost}
                >
                    <span className="text-gray-500 text-sm">What's on your mind?</span>
                </div>
            </div>
        </div>
    );
};

export default CreatePostBar; 
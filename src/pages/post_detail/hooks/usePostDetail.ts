import { useState, useEffect } from 'react';
import { Post } from '@/data/posts';
import { PostService } from '@/services/postService';

interface UsePostDetailProps {
    postId: number;
}

interface UsePostDetailReturn {
    post: Post | null;
    loading: boolean;
    error: string | null;
    handleLike: (id: number, isLiked: boolean) => Promise<void>;
}

export const usePostDetail = ({ postId }: UsePostDetailProps): UsePostDetailReturn => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch post data when component mounts or ID changes
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);
                const postData = await PostService.getPostById(postId);
                if (postData) {
                    setPost(postData);
                } else {
                    setError('Post not found');
                }
            } catch (err) {
                setError('Failed to load post');
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };

        if (postId && !isNaN(postId)) {
            fetchPost();
        } else {
            setError('Invalid post ID');
            setLoading(false);
        }
    }, [postId]);

    const handleLike = async (id: number, isLiked: boolean) => {
        try {
            const updatedPost = await PostService.updatePostLikes(id, isLiked);
            if (updatedPost) {
                setPost(updatedPost);
            }
        } catch (err) {
            console.error('Error updating post likes:', err);
        }
    };

    return {
        post,
        loading,
        error,
        handleLike,
    };
}; 
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { updatePost } from '@/services/post';
import { Post } from '@/types/post';

const useLikePost = () => {
    const queryClient = useQueryClient();

    const likePost = async (id: number, isLiked: boolean) => {
        try {
            // Optimistically update individual post cache first
            queryClient.setQueryData(['post', id], (oldPost: Post | undefined) => {
                if (!oldPost) return oldPost
                return { ...oldPost, is_liked: isLiked }
            });

            // Also update posts list cache if it exists
            queryClient.setQueryData(['posts'], (oldData: InfiniteData<Post[], string> | undefined) => {
                if (!oldData) return oldData
                
                const newPages = oldData.pages.map(page => 
                    page.map(post => post.id === id ? { ...post, is_liked: isLiked } : post)
                )
                
                return {
                    ...oldData,
                    pages: newPages
                }
            });

            // Then make the actual API call
            await updatePost(id, {
                is_liked: isLiked,
                updated_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating post:', error);
            // Revert optimistic update on error
            queryClient.invalidateQueries({ queryKey: ['post', id] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    };

    return { likePost };
};

export default useLikePost; 
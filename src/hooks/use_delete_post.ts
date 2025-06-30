import { useMutation, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { deletePost } from '@/services/post';
import { Post } from '@/types/post';
import { toast } from 'sonner';

interface UseDeletePostOptions {
    onSuccess?: (deletedPostId: number) => void;
    onError?: (error: Error) => void;
    redirectTo?: string;
}

export const useDeletePost = (options: UseDeletePostOptions = {}) => {
    const queryClient = useQueryClient();
    const history = useHistory();

    return useMutation({
        mutationFn: deletePost,
        onSuccess: (_, deletedPostId) => {
            // Remove from posts list cache
            queryClient.setQueryData(['posts'], (oldData: InfiniteData<Post[], string> | undefined) => {
                if (!oldData) return oldData;
                
                const newPages = oldData.pages.map(page => 
                    page.filter(post => post.id !== deletedPostId)
                );
                
                return {
                    ...oldData,
                    pages: newPages
                };
            });

            // Remove individual post cache
            queryClient.removeQueries({ queryKey: ['post', deletedPostId.toString()] });
            
            // Invalidate posts list to ensure consistency
            queryClient.invalidateQueries({ queryKey: ['posts'] });

            // Show success toast
            toast.success('Post deleted successfully');

            // Redirect if specified
            if (options.redirectTo) {
                history.replace(options.redirectTo);
            }

            // Call custom success handler
            options.onSuccess?.(deletedPostId);
        },
        onError: (error: Error) => {
            console.error('Error deleting post:', error);
            
            // Show error toast
            toast.error('Failed to delete post. Please try again.');
            
            // Call custom error handler
            options.onError?.(error);
        }
    });
}; 
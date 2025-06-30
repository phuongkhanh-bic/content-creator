import { Comment } from "@/types/comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "@/services/comment"

const useCreateComment = (postId: number) => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (comment: Partial<Comment>) => createComment(comment),
        onSuccess: async (data, variables) => {
            console.log('comment created successfully with', { data, variables })
            
            // Add the new comment to the top of the comments query cache
            queryClient.setQueryData(['comments', postId], (oldData: Comment[] | undefined) => {
                if (!oldData) return [data]
                
                // Add the new comment to the top of the list
                return [data, ...oldData]
            })
        }
    })
}

export default useCreateComment 
import { Post } from "@/types/post"
import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query"
import { useHistory } from "react-router-dom"
import { updatePost } from "@/services/post"
import { Preferences } from "@capacitor/preferences"
import { DRAFT_POST } from "../components/text_editor_wrapper"
import { AppRoutes } from "@/constants/routes"
import { toast } from "sonner"

const useUpdatePost = (postId: number) => {
    const history = useHistory()
    const queryClient = useQueryClient()
    
    const updatePostsCache = (updatedPost: Post) => {
        queryClient.setQueryData(['posts'], (oldData: InfiniteData<Post[], string> | undefined) => {
            if (!oldData) return oldData
            
            const newPages = oldData.pages.map(page => 
                page.map(post => post.id === postId ? updatedPost : post)
            )
            
            return {
                ...oldData,
                pages: newPages
            }
        })
    }

    const updateIndividualPostCache = (updatedPost: Post) => {
        queryClient.setQueryData(['post', postId.toString()], updatedPost)
    }

    const cleanupAndNavigate = async (updatedPost: Post) => {
        await Preferences.remove({ key: DRAFT_POST })
        history.replace(`${AppRoutes.PostDetail}/${updatedPost.id}`)
    }
    
    return useMutation({
        mutationFn: async (post: Omit<Partial<Post>, 'id'>) => updatePost(postId, post),
        onSuccess: async (updatedPost) => {
            // Update caches optimistically
            updatePostsCache(updatedPost)
            updateIndividualPostCache(updatedPost)
            
            // Show success message
            toast.success('Post updated successfully')
            
            // Clean up and navigate
            await cleanupAndNavigate(updatedPost)
        },
        onError: (error) => {
            console.error('Error updating post:', error)
            toast.error('Failed to update post. Please try again.')
        }
    })
}

export default useUpdatePost 
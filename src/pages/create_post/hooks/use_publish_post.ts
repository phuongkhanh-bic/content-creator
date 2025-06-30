import { Post } from "@/types/post"
import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query"
import { useHistory } from "react-router-dom"
import { createPost } from "@/services/post"
import { Preferences } from "@capacitor/preferences"
import { DRAFT_POST } from "../components/text_editor_wrapper"
import { AppRoutes } from "@/constants/routes"
import { toast } from "sonner"

const usePublishPost = () => {
    const history = useHistory()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (post: Partial<Post>) => createPost(post),
        onSuccess: async (data, variables) => {
            console.log('post created successfully with', { data, variables })
            
            try {
                // Add the new post to the top of the posts query cache
                queryClient.setQueryData(['posts'], (oldData: InfiniteData<Post[], string> | undefined) => {
                    if (!oldData) {
                        return { 
                            pages: [[data]], 
                            pageParams: [''] 
                        }
                    }
                    
                    // Add the new post to the first page (top of the list)
                    const newPages = [...oldData.pages]
                    if (newPages.length > 0) {
                        newPages[0] = [data, ...newPages[0]]
                    } else {
                        newPages.push([data])
                    }
                    
                    const updatedData = {
                        ...oldData,
                        pages: newPages
                    }
                    
                    console.log('Updated cache data:', updatedData)
                    return updatedData
                })
                
                // Also invalidate the posts query to ensure consistency
                await queryClient.invalidateQueries({ queryKey: ['posts'] })
                
                // Show success toast
                toast.success('Post created successfully')
                
                await Preferences.remove({ key: DRAFT_POST })
                history.replace(AppRoutes.PostDetail + '/' + data.id)
            } catch (error) {
                console.error('Error updating cache:', error)
                // Fallback: just invalidate queries
                await queryClient.invalidateQueries({ queryKey: ['posts'] })
                toast.success('Post created successfully')
                await Preferences.remove({ key: DRAFT_POST })
                history.replace(AppRoutes.PostDetail + '/' + data.id)
            }
        },
        onError: (error) => {
            console.error('Error creating post:', error)
            toast.error('Failed to create post. Please try again.')
        }
    })
}

export default usePublishPost
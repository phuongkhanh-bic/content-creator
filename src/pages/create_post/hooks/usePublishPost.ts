import { Post } from "@/types/post"
import { useMutation, useQueryClient, InfiniteData } from "@tanstack/react-query"
import { useHistory } from "react-router-dom"
import { createPost } from "@/services/post"
import { Preferences } from "@capacitor/preferences"
import { DRAFT_POST } from "../components/text_editor_wrapper"
import { AppRoutes } from "@/constants/routes"

const usePublishPost = () => {
    const history = useHistory()
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (post: Partial<Post>) => createPost(post),
        onSuccess: async (data, variables) => {
            console.log('post created successfully with', { data, variables })
            
            // Add the new post to the top of the posts query cache
            queryClient.setQueryData(['posts'], (oldData: InfiniteData<Post[], string> | undefined) => {
                if (!oldData) return { pages: [[data]], pageParams: [''] }
                
                // Add the new post to the first page (top of the list)
                const newPages = [...oldData.pages]
                newPages[0] = [data, ...newPages[0]]
                
                return {
                    ...oldData,
                    pages: newPages
                }
            })
            
            await Preferences.remove({ key: DRAFT_POST })
            history.replace(AppRoutes.PostDetail + '/' + data.id)
        }
    })
}

export default usePublishPost
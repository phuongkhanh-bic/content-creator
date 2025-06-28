import { Post } from "@/types/post"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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
            await Preferences.remove({ key: DRAFT_POST })
            history.replace(AppRoutes.Newsfeed)
        }
    })
}

export default usePublishPost
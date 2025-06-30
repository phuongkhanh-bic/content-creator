import { supabaseClient } from './supabase'
import { Comment } from '@/types/comment'
import { TABLES } from '@/constants/database'

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const { data, error } = await supabaseClient
        .from(TABLES.COMMENT)
        .select()
        .eq('post_id', postId)
        .order('created_at', { ascending: false })
    
    if (error) {
        throw new Error(error.message)
    }
    return data || []
}

export const createComment = async (comment: Partial<Comment>): Promise<Comment> => {
    const { data, error } = await supabaseClient
        .from(TABLES.COMMENT)
        .insert(comment)
        .select()
    
    if (error) {
        throw new Error(error.message)
    }
    return data[0]
}

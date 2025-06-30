import { supabaseClient } from './supabase'
import { Post } from '@/types/post'
import { POST_PAGE_SIZE, TABLES } from '@/constants/database'

export const getPostById = async (id: number): Promise<Post> => {
    const { data, error } = await supabaseClient.from(TABLES.POST).select().eq('id', id)
    if (error) {
        throw new Error(error.message)
    }
    return data[0]
}

export const getPosts = async (cursor: string): Promise<Post[]> => {
    const { data, error } = await supabaseClient
        .from(TABLES.POST)
        .select()
        .lt('created_at', [cursor || new Date().toISOString()])
        .order('created_at', { ascending: false })
        .limit(POST_PAGE_SIZE)
    
    if (error) {
        throw new Error(error.message)
    }
    return data
}

export const createPost = async (post: Partial<Post>): Promise<Post> => {
    const { data, error } = await supabaseClient.from(TABLES.POST).insert(post).select()
    
    if (error) {
        throw new Error(error.message)
    }
    return data[0]
}

export const updatePost = async (id: number, post: Omit<Partial<Post>, 'id'>): Promise<Post> => {
    const { data, error } = await supabaseClient.from(TABLES.POST).update(post).eq('id', id).select()
    
    if (error) {
        throw new Error(error.message)
    }
    return data[0]
}

export const deletePost = async (id: number): Promise<void> => {
    const { error } = await supabaseClient.from(TABLES.POST).delete().eq('id', id)
    
    if (error) {
        throw new Error(error.message)
    }
}
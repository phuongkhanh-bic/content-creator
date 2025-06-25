import { Post, getAllPosts as getPostsData, getPostById as getPostByIdData, updatePostLikes as updatePostLikesData } from '@/data/posts';

/**
 * Post Service - Handles all post-related operations
 * This service layer can be easily extended to work with APIs in the future
 */

export class PostService {
    /**
     * Get all posts
     */
    static async getAllPosts(): Promise<Post[]> {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getPostsData());
            }, 100);
        });
    }

    /**
     * Get a single post by ID
     */
    static async getPostById(id: number): Promise<Post | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = getPostByIdData(id);
                resolve(post || null);
            }, 500);
        });
    }

    /**
     * Update post likes
     */
    static async updatePostLikes(id: number, isLiked: boolean): Promise<Post | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedPost = updatePostLikesData(id, isLiked);
                resolve(updatedPost || null);
            }, 100);
        });
    }

    /**
     * Add a new post (for future use)
     */
    static async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would make an API call
                const newPost: Post = {
                    ...postData,
                    id: Date.now(), // Simple ID generation
                };
                resolve(newPost);
            }, 200);
        });
    }

    /**
     * Update a post (for future use)
     */
    static async updatePost(id: number, updates: Partial<Post>): Promise<Post | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would make an API call
                const existingPost = getPostByIdData(id);
                if (existingPost) {
                    const updatedPost = { ...existingPost, ...updates };
                    resolve(updatedPost);
                } else {
                    resolve(null);
                }
            }, 200);
        });
    }

    /**
     * Delete a post (for future use)
     */
    static async deletePost(id: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, this would make an API call
                const post = getPostByIdData(id);
                resolve(!!post);
            }, 100);
        });
    }
} 
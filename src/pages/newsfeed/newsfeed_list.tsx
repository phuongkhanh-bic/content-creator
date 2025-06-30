import PostItem from '@/components/post_item';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonSpinner } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/services/post';
import { POST_PAGE_SIZE } from '@/constants/database';

const NewsfeedList: React.FC = () => {
    const history = useHistory();

    const { data, error, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam }) => getPosts(pageParam),
        initialPageParam: '',
        getNextPageParam: (lastPage) => {
            if (lastPage.length < POST_PAGE_SIZE) {
                return undefined
            }
            return lastPage[lastPage.length - 1].created_at
        }
    })

    const posts = data?.pages.flat()

    console.log({ posts: data?.pages.flat(), error, fetchNextPage, hasNextPage, isFetching, status })


    const onReaction = async (id: number, isLiked: boolean) => {
        console.log(`Post ${id} reaction: ${isLiked ? 'liked' : 'unliked'}`);
        // try {
        //     const updatedPost = await PostService.updatePostLikes(id, isLiked);
        //     if (updatedPost) {
        //         // Update the posts state with the updated post
        //         setPosts(prevPosts => 
        //             prevPosts.map(post => 
        //                 post.id === id ? updatedPost : post
        //             )
        //         );
        //     }
        // } catch (error) {
        //     console.error('Error updating post likes:', error);
        // }
    }
    
    const onComment = (id: number) => {
        history.push(`/post/${id}`);
    }

    const onEndReached = () => {
        console.log('onEndReached');
    }

    if (isPending) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center space-y-3">
                    <IonSpinner name="crescent" color="primary" />  
                    <div className="text-gray-500 text-sm">Loading posts...</div>
                </div>
            </div>
        );
    }


    return (
        <>
            <IonList className="space-y-6 !pb-4">
                {posts?.map((post) => (
                    <PostItem key={post.id} post={post} onReaction={onReaction} onComment={onComment} />
                ))}
            </IonList>
            <IonInfiniteScroll onIonInfinite={onEndReached}>
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </>
    );
};

export default NewsfeedList;
import PostItem from '@/components/post_item';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonSpinner, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/services/post';
import { POST_PAGE_SIZE } from '@/constants/database';
import { AppRoutes } from '@/constants/routes';
import { useDeletePost } from '@/hooks/use_delete_post';
import useLikePost from '@/hooks/use_like_post';

const NewsfeedList: React.FC = () => {
    const history = useHistory();
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

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

    const { mutate: deletePost } = useDeletePost();
    const { likePost } = useLikePost();

    const posts = data?.pages.flat()

    console.log({ posts: data?.pages.flat(), error, fetchNextPage, hasNextPage, isFetching, status })

    const onReaction = async (id: number, isLiked: boolean) => {
        await likePost(id, isLiked);
    }
    
    const onComment = (id: number) => {
        history.push(`/post/${id}`);
    }

    const onEdit = (id: number) => {
        // Navigate to edit post page
        history.push(`${AppRoutes.EditPost}?id=${id}`);
    }

    const onDelete = (id: number) => {
        setPostToDelete(id);
        setIsDeleteAlertOpen(true);
    }

    const confirmDelete = () => {
        if (postToDelete) {
            deletePost(postToDelete);
        }
        setIsDeleteAlertOpen(false);
        setPostToDelete(null);
    }

    const cancelDelete = () => {
        setIsDeleteAlertOpen(false);
        setPostToDelete(null);
    }

    const onEndReached = async (ev: CustomEvent<void>) => {
        if (hasNextPage && !isFetching) {
            await fetchNextPage();
        }
        (ev.target as HTMLIonInfiniteScrollElement).complete();
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
                    <PostItem 
                        key={post.id} 
                        post={post} 
                        onReaction={onReaction} 
                        onComment={onComment}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </IonList>
            <IonInfiniteScroll 
                onIonInfinite={onEndReached}
                disabled={!hasNextPage}
            >
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>

            <IonAlert
                isOpen={isDeleteAlertOpen}
                onDidDismiss={cancelDelete}
                header="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: cancelDelete,
                    },
                    {
                        text: 'Delete',
                        role: 'destructive',
                        handler: confirmDelete,
                    },
                ]}
            />
        </>
    );
};

export default NewsfeedList;
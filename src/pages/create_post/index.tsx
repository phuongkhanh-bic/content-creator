import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import { chevronBack } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/button';
import TextEditorWrapper, { TextEditorWrapperRef } from './components/text_editor_wrapper';
import usePublishPost from './hooks/use_publish_post';
import useUpdatePost from './hooks/use_update_post';
import { getPostById } from '@/services/post';
import { Post } from '@/types/post';

const CreatePost: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const editorRef = useRef<TextEditorWrapperRef>(null);
    
    // Check if we're in edit mode by looking at the URL
    const isEditMode = location.pathname === '/edit-post';
    
    // Get post ID from URL parameters
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get('id');
    const postIdNumber = postId ? parseInt(postId) : null;
    
    // Fetch post data if in edit mode
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postIdNumber!),
        enabled: isEditMode && !!postIdNumber,
    });

    const { mutateAsync: publishPost } = usePublishPost();
    const { mutateAsync: updatePost } = useUpdatePost(postIdNumber || 0);

    const onClose = () => {
        history.goBack();
    };

    const handlePublish = () => {
        try {
            const editorContent = editorRef.current?.getCurrentContent();

            if (isEditMode && postIdNumber) {
                // Update existing post
                const updatedPost: Omit<Partial<Post>, 'id'> = {
                    content: JSON.stringify(editorContent),
                    updated_at: new Date().toISOString()
                };
                updatePost(updatedPost);
            } else {
                // Create new post
                const newPost: Partial<Post> = {
                    content: JSON.stringify(editorContent),
                    is_liked: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                publishPost(newPost);
            }
        } catch (error) {
            console.error('Error publishing/updating post:', error);
        }
    };

    // Show loading state while fetching post data in edit mode
    if (isEditMode && isLoading) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <Button fill="clear" color="dark" onClick={onClose}>
                                <IonIcon icon={chevronBack} />
                            </Button>
                        </IonButtons>
                        <IonTitle className='mx-4'>Loading...</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="bg-gray-50">
                    <div className="flex items-center justify-center h-full">
                        <div>Loading post...</div>
                    </div>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <Button fill="clear" color="dark" onClick={onClose}>
                            <IonIcon icon={chevronBack} />
                        </Button>
                    </IonButtons>
                    <IonTitle className='mx-4'>
                        {isEditMode ? 'Edit Post' : 'Create Post'}
                    </IonTitle>
                    <IonButtons slot="end" className="flex gap-2 pr-2">
                        <Button
                            fill="solid"
                            color="primary"
                            onClick={handlePublish}
                        >
                            {isEditMode ? 'Update' : 'Post'}
                        </Button>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="bg-gray-50">
                <TextEditorWrapper 
                    ref={editorRef} 
                    initialContent={post?.content}
                    isEditMode={isEditMode}
                />
            </IonContent>
        </IonPage>
    );
};

export default CreatePost;
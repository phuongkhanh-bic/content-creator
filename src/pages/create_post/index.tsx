import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Button from '@/components/button';
import TextEditorWrapper, { TextEditorWrapperRef } from './components/text_editor_wrapper';
import usePublishPost from './hooks/usePublishPost';
import { Post } from '@/types/post';

const CreatePost: React.FC = () => {
    const history = useHistory();
    const editorRef = useRef<TextEditorWrapperRef>(null);
    const { mutateAsync: publishPost } = usePublishPost()

    const onClose = () => {
        history.goBack();
    };

    const handlePublish = () => {
        try {
            const editorContent = editorRef.current?.getCurrentContent();
            console.log('Publishing post with content:', editorContent);

            const post: Partial<Post> = {
                content: JSON.stringify(editorContent),
                is_liked: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }

            publishPost(post);
        } catch (error) {
            console.error('Error publishing post:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <Button fill="clear" color="dark" onClick={onClose}>
                            <IonIcon icon={chevronBack} />
                        </Button>
                    </IonButtons>
                    <IonTitle className='mx-4'>Create Post</IonTitle>
                    <IonButtons slot="end" className="flex gap-2 pr-2">
                        <Button
                            fill="solid"
                            color="primary"
                            onClick={handlePublish}
                        >
                            Post
                        </Button>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="bg-gray-50">
                <TextEditorWrapper ref={editorRef} />
            </IonContent>
        </IonPage>
    );
};

export default CreatePost;
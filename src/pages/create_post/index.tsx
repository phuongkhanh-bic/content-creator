import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Button from '@/components/button';
import TextEditorWrapper from './components/text_editor_wrapper';

const CreatePost: React.FC = () => {
    const history = useHistory();

    const onClose = () => {
        history.goBack();
    };

    const handlePublish = () => {
        // TODO: Implement publish functionality
        console.log('Publishing post...');
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
            <IonContent>
                <TextEditorWrapper />
            </IonContent>
        </IonPage>
    );
};

export default CreatePost;
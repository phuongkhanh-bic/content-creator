import { IonHeader, IonToolbar, IonButtons, IonTitle, IonIcon } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import Button from '@/components/button';

interface PostDetailHeaderProps {
    onBack: () => void;
}

const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({ onBack }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <Button fill="clear" color="dark" onClick={onBack}>
                        <IonIcon icon={chevronBack} />
                    </Button>
                </IonButtons>
                <IonTitle>Post</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default PostDetailHeader; 
import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';

interface PostMenuButtonProps {
    onClick: (e: React.MouseEvent) => void;
}

const PostMenuButton: React.FC<PostMenuButtonProps> = ({ onClick }) => {
    return (
        <IonButton
            fill="clear"
            size="small"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full min-h-8 min-w-8 --padding-start: 8px --padding-end: 8px"
            onClick={onClick}
        >
            <IonIcon icon={ellipsisHorizontal} className="text-lg" />
        </IonButton>
    );
};

export default PostMenuButton; 
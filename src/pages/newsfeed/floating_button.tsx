import { IonIcon } from '@ionic/react';
import React from 'react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from '@/constants/routes';

const FloatingButton: React.FC = () => {
    const history = useHistory();

    const handleCreatePost = () => {
        history.push(AppRoutes.CreatePost);
    };

    return (
        <div 
            className="fixed bottom-26 right-6 z-50 w-12 h-12 rounded-[50%] shadow-lg flex items-center justify-center bg-[#7335c0] hover:bg-[#5d2b9a] text-white cursor-pointer"
            onClick={handleCreatePost}
        >
            <IonIcon icon={add} className="text-xl"></IonIcon>
        </div>
    );
};

export default FloatingButton; 
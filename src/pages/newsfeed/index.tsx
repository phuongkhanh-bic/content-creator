import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import CreatePostBar from './create_post_bar';
import NewsfeedList from './newsfeed_list';
import MainLayout from '../../components/layout/main_layout';

const Newsfeed: React.FC = () => {
    return (
        <IonPage className="pt-[var(--ion-safe-area-top)] pb-[var(--ion-safe-area-bottom)]">
            <IonContent className="bg-gray-50">
                <MainLayout>
                    <CreatePostBar />
                    <NewsfeedList />
                </MainLayout>
            </IonContent>
        </IonPage>
    );
};

export default Newsfeed;
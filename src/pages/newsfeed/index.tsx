import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import CreatePostBar from './create_post_bar';
import NewsfeedList from './newsfeed_list';

const Newsfeed: React.FC = () => {
    return (
        <IonPage className="pt-[var(--ion-safe-area-top)] pb-[var(--ion-safe-area-bottom)] bg-background">
            <IonContent>
                <CreatePostBar />
                <NewsfeedList />
            </IonContent>
        </IonPage>
    );
};

export default Newsfeed;
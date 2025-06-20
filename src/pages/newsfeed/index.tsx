import { IonContent, IonList, IonPage } from '@ionic/react';
import React from 'react';
import PostItem from '@/components/post_item';
import FloatingButton from './floating_button';

const Newsfeed: React.FC = () => {
    return (
        <IonPage className="pt-[var(--ion-safe-area-top)] pb-[var(--ion-safe-area-bottom)] bg-background">
            <IonContent>
                <IonList className="space-y-6 !pb-4">
                    <PostItem />
                    <PostItem />
                    <PostItem />        
                </IonList>

                <FloatingButton />
            </IonContent>
        </IonPage>
    );
};

export default Newsfeed;
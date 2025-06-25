import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import MainLayout from '../../components/layout/main_layout';

const Explore: React.FC = () => {
    return (
        <IonPage className="pt-[var(--ion-safe-area-top)] pb-[var(--ion-safe-area-bottom)]">
            <IonContent className="bg-gray-50">
                <MainLayout>
                    <div className="text-center py-2">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Explore</h1>
                        <p className="text-gray-600">Discover new content and creators</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {/* Placeholder for explore content */}
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                                    <h3 className="font-semibold text-gray-800">Trending Topic {i + 1}</h3>
                                    <p className="text-sm text-gray-600 mt-2">Explore what's trending in the community</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </MainLayout>
            </IonContent>
        </IonPage>
    );
};

export default Explore; 
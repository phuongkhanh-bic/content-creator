import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import MainLayout from '../../components/layout/main_layout';

const Profile: React.FC = () => {
    return (
        <IonPage className="pt-[var(--ion-safe-area-top)] pb-[var(--ion-safe-area-bottom)]">
            <IonContent className="bg-gray-50">
                <MainLayout>
                    <div className="text-center py-4">
                        {/* Profile Header */}
                        <div className="mb-8">
                            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                            <h1 className="text-2xl font-bold text-gray-800">Your Name</h1>
                            <p className="text-gray-600">@username</p>
                            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                                Content creator passionate about sharing stories and connecting with others.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center space-x-8 mb-8">
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-800">42</div>
                                <div className="text-sm text-gray-600">Posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-800">1.2K</div>
                                <div className="text-sm text-gray-600">Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-800">856</div>
                                <div className="text-sm text-gray-600">Following</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-4 mb-8">
                            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Edit Profile
                            </button>
                            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Share Profile
                            </button>
                        </div>

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </MainLayout>
            </IonContent>
        </IonPage>
    );
};

export default Profile; 
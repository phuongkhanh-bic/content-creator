import { IonSpinner } from '@ionic/react';

const LoadingState: React.FC = () => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
                <IonSpinner name="crescent" color="primary" />
                <div className="text-gray-500 text-sm">Loading post...</div>
            </div>
        </div>
    );
};

export default LoadingState; 
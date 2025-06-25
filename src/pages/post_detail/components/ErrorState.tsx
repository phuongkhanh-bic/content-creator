import Button from '@/components/button';

interface ErrorStateProps {
    error: string;
    onBack: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onBack }) => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <div className="text-red-500 mb-2">{error}</div>
                <Button fill="outline" onClick={onBack}>
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default ErrorState; 
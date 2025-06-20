import { IonAvatar, IonImg, IonInput, IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { send } from 'ionicons/icons';

interface CommentInputProps {
    userAvatar?: string;
    placeholder?: string;
    onSendComment: (comment: string) => void;
    disabled?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
    userAvatar = "https://picsum.photos/200/200",
    placeholder = "Write a comment...",
    onSendComment,
    disabled = false
}) => {
    const [commentText, setCommentText] = useState('');

    const handleSendComment = () => {
        if (commentText.trim() && !disabled) {
            onSendComment(commentText);
            setCommentText('');
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendComment();
        }
    };

    return (
        <div className="flex items-center gap-3">
            <IonAvatar className="w-8 h-8">
                <IonImg
                    src={userAvatar}
                    alt="user avatar"
                />
            </IonAvatar>
            <div className="flex-1 bg-gray-50 rounded-full px-3 py-2">
                <IonInput
                    placeholder={placeholder}
                    value={commentText}
                    onIonInput={(e) => setCommentText(e.detail.value || '')}
                    onKeyPress={handleKeyPress}
                    className="text-gray-700 text-sm leading-relaxed"
                    clearInput
                    disabled={disabled}
                    style={{
                        '--placeholder-color': '#6B7280',
                        '--placeholder-opacity': '1'
                    } as React.CSSProperties}
                />
            </div>
            <IonButton
                fill="clear"
                className="text-blue-500 hover:text-blue-600 h-auto p-0"
                onClick={handleSendComment}
                disabled={!commentText.trim() || disabled}
            >
                <IonIcon icon={send} />
            </IonButton>
        </div>
    );
};

export default CommentInput; 
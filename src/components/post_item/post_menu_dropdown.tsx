import React from 'react';
import { IonIcon } from '@ionic/react';
import { create, trash } from 'ionicons/icons';

interface MenuItemProps {
    icon: string;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive';
}

interface PostMenuDropdownProps {
    isOpen: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, variant = 'default' }) => {
    const isDestructive = variant === 'destructive';

    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-3 text-left text-sm font-medium text-gray-700 flex items-center gap-3 transition-colors duration-150 ${isDestructive ? 'hover:bg-red-50 hover:text-red-700' : 'hover:bg-blue-50 hover:text-blue-700'}`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-100' : 'bg-blue-100'}`}>
                <IonIcon icon={icon} className={`text-base ${isDestructive ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <span>{label}</span>
        </button>
    );
};

const PostMenuDropdown: React.FC<PostMenuDropdownProps> = ({ isOpen, onEdit, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
            <div className="p-2">
                <MenuItem
                    icon={create}
                    label="Edit"
                    onClick={onEdit}
                    variant="default"
                />
                <div className="mx-3 my-1 border-t border-gray-100"></div>
                <MenuItem
                    icon={trash}
                    label="Delete"
                    onClick={onDelete}
                    variant="destructive"
                />
            </div>
        </div>
    );
};

export default PostMenuDropdown; 
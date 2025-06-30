import React from 'react';
import { IonActionSheet } from '@ionic/react';
import Avatar from '@/components/avatar';
import { formatTimeAgo } from '@/lib/utils';
import PostMenuButton from './post_menu_button';
import PostMenuDropdown from './post_menu_dropdown';
import { usePostMenu } from './hooks/use_post_menu';

interface PostHeaderProps {
    createdAt: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
    createdAt,
    onEdit = () => {},
    onDelete = () => {}
}) => {
    const {
        isMobile,
        isActionSheetOpen,
        isDropdownOpen,
        dropdownRef,
        handleMenuClick,
        handleEdit,
        handleDelete,
        actionSheetButtons,
        setIsActionSheetOpen
    } = usePostMenu({ onEdit, onDelete });

    return (
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
                <Avatar size="md" />
                <div className="flex flex-col">
                    <span className="text-gray-700 text-base font-semibold">
                        {'Kilian Jornet'}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {formatTimeAgo(createdAt)}
                    </span>
                </div>
            </div>
            
            <div className="relative" ref={dropdownRef}>
                <PostMenuButton onClick={handleMenuClick} />

                {/* Desktop/Web Dropdown */}
                <PostMenuDropdown
                    isOpen={isDropdownOpen}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Mobile Action Sheet */}
                {isMobile && (
                    <IonActionSheet
                        isOpen={isActionSheetOpen}
                        onDidDismiss={() => setIsActionSheetOpen(false)}
                        buttons={actionSheetButtons}
                    />
                )}
            </div>
        </div>
    );
};

export default PostHeader; 
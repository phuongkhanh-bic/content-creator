import { useState, useEffect, useRef } from 'react';
import { isPlatform } from '@ionic/react';
import { create, trash } from 'ionicons/icons';

interface UsePostMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}

export const usePostMenu = ({ onEdit, onDelete }: UsePostMenuProps) => {
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isMobile = isPlatform('mobile') || isPlatform('hybrid');

    // Handle click outside for web dropdown
    useEffect(() => {
        if (!isMobile && isDropdownOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsDropdownOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen, isMobile]);

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMobile) {
            setIsActionSheetOpen(true);
        } else {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleEdit = () => {
        setIsDropdownOpen(false);
        onEdit();
    };

    const handleDelete = () => {
        setIsDropdownOpen(false);
        onDelete();
    };

    const actionSheetButtons = [
        {
            text: 'Edit',
            icon: create,
            handler: onEdit
        },
        {
            text: 'Delete',
            role: 'destructive' as const,
            icon: trash,
            handler: onDelete
        },
    ];

    return {
        isMobile,
        isActionSheetOpen,
        isDropdownOpen,
        dropdownRef,
        handleMenuClick,
        handleEdit,
        handleDelete,
        actionSheetButtons,
        setIsActionSheetOpen
    };
}; 
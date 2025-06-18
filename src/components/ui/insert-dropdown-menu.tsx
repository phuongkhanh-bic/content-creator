import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";


import { ListStyleType } from "@udecode/plate-indent-list";
import {
    type PlateEditor,
    useEditorRef,
} from "@udecode/plate/react";
import { ImagePlugin } from "@udecode/plate-media/react";

import {
    ImageIcon,
    ListIcon,
    ListOrderedIcon,
    PlusIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import {insertBlock} from "../editor/transforms";

import { ToolbarButton, ToolbarMenuGroup } from "./toolbar";

type Group = {
    group: string;
    items: Item[];
};

interface Item {
    icon: React.ReactNode;
    value: string;
    onSelect: (editor: PlateEditor, value: string) => void;
    focusEditor?: boolean;
    label?: string;
}

const groups: Group[] = [
    {
        group: "Lists",
        items: [
            {
                icon: <ListIcon />,
                label: "Bulleted list",
                value: ListStyleType.Disc,
            },
            {
                icon: <ListOrderedIcon />,
                label: "Numbered list",
                value: ListStyleType.Decimal,
            },
            ].map((item) => ({
            ...item,
            onSelect: (editor, value) => {
                insertBlock(editor, value);
            },
        })),
    },
    {
        group: "Media",
        items: [
        {
            icon: <ImageIcon />,
            label: "Image",
            value: ImagePlugin.key,
        },
        ].map((item) => ({
        ...item,
        onSelect: (editor, value) => {
            insertBlock(editor, value);
        },
        })),
    },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
    const editor = useEditorRef();
    const [open, setOpen] = React.useState(false);

    return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
        <DropdownMenuTrigger asChild>
            <ToolbarButton pressed={open} tooltip="Insert" isDropdown>
            <PlusIcon />
            </ToolbarButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
            align="start"
        >
            {groups.map(({ group, items: nestedItems }) => (
                <ToolbarMenuGroup key={group} label={group}>
                    {nestedItems.map(({ icon, label, value, onSelect }) => (
                        <DropdownMenuItem
                            key={value}
                            className="min-w-[180px]"
                            onSelect={() => {
                                onSelect(editor, value);
                                editor.tf.focus();
                            }}
                        >
                        {icon}
                        {label}
                    </DropdownMenuItem>
                    ))}
                </ToolbarMenuGroup>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    );
}

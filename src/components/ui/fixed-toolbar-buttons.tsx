import { useDevice } from "@/hooks/use_device";
import { cn } from "@/lib/utils";
import { useEditorReadOnly } from "@udecode/plate-core/react";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarButton, ToolbarGroup } from "./toolbar";
import { BoldPlugin, UnderlinePlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin } from "@udecode/plate-basic-marks/react";
import { Code2Icon, StrikethroughIcon } from "lucide-react";
import { InsertDropdownMenu } from "./insert-dropdown-menu";

const ToolbarButtons = () => {
    return (
        <>
            <ToolbarGroup className="gap-1">
                <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">B</MarkToolbarButton>
                <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">I</MarkToolbarButton>
                <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">U</MarkToolbarButton>
                <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                    <Code2Icon />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+M)">
                    <StrikethroughIcon />
                </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup className="gap-1">
                <InsertDropdownMenu />
            </ToolbarGroup>
            <ToolbarGroup className="gap-1">
                <ToolbarButton>H1</ToolbarButton>
                <ToolbarButton>H2</ToolbarButton>
                <ToolbarButton>H3</ToolbarButton>
                <ToolbarButton>Quote</ToolbarButton>
            </ToolbarGroup>
        </>
    )
}

type FixedToolbarButtonsProps = React.HTMLAttributes<HTMLDivElement>;

export default function FixedToolbarButtons({
    className,
    ...props
}: FixedToolbarButtonsProps) {
    const { isMobile } = useDevice();
    const readOnly = useEditorReadOnly();
    console.log(readOnly, isMobile)
    
    return (
        <div
            className={cn("flex flex-wrap w-full gap-1 overflow-y-auto", className)}
            {...props}
        >
            {!readOnly && (isMobile ? <ToolbarButtons /> : <ToolbarButtons />)}
        </div>
    );
}
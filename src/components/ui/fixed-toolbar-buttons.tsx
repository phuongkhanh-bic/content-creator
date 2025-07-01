import { cn } from "@/lib/utils";
import { useEditorReadOnly } from "@udecode/plate/react";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { BoldPlugin, UnderlinePlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin } from "@udecode/plate-basic-marks/react";
import { Code2Icon, StrikethroughIcon } from "lucide-react";
import { ImagePlugin, VideoPlugin } from "@udecode/plate-media/react";
import { MediaToolbarButton } from "./media-toolbar-button";
import { TurnIntoToolbarButton } from "./turn-into-toolbar-button";

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
                <TurnIntoToolbarButton />
            </ToolbarGroup>
            
            {/* <ToolbarGroup className="gap-1">
                <MediaToolbarButton nodeType={ImagePlugin.key} />
            </ToolbarGroup>
            <ToolbarGroup className="gap-1">
                <MediaToolbarButton nodeType={VideoPlugin.key} />
            </ToolbarGroup> */}
        </>
    )
}

type FixedToolbarButtonsProps = React.HTMLAttributes<HTMLDivElement>;

export default function FixedToolbarButtons({
    className,
    ...props
}: FixedToolbarButtonsProps) {
    const readOnly = useEditorReadOnly();
    
    return (
        <div
            className={cn("flex flex-wrap w-full gap-1 overflow-y-auto", className)}
            {...props}
        >
            {!readOnly && <ToolbarButtons />}
        </div>
    );
}
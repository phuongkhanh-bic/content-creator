import { useCreateEditor } from "@/components/editor/use-create-editor";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import FixedToolbarButtons from "@/components/ui/fixed-toolbar-buttons";
import { Plate } from "@udecode/plate/react";

const TextEditorWrapper = () => {
    const editor = useCreateEditor();

    const renderFixedToolbar = () => {
        return (
            <FixedToolbar>
                <FixedToolbarButtons />
            </FixedToolbar>
        );
    };
    

    return (
        <Plate editor={editor}>
            {renderFixedToolbar()}
        </Plate>
    )
}

export default TextEditorWrapper;
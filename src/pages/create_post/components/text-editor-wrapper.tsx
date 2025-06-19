import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/editor";
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

    const renderEditor = () => {
        return <Editor placeholder='What is on your mind?' />;
    }
    

    return (
        <Plate editor={editor}>
            <EditorContainer>
                {renderFixedToolbar()}
                {renderEditor()}
            </EditorContainer>
        </Plate>
    )
}

export default TextEditorWrapper;
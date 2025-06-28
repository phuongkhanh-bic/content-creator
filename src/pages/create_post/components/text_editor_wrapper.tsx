import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { FixedToolbar } from "@/components/ui/fixed-toolbar";
import FixedToolbarButtons from "@/components/ui/fixed-toolbar-buttons";
import { Plate } from "@udecode/plate/react";
import { Preferences } from '@capacitor/preferences'
import { useCallback, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { debounce } from "lodash";
import { Value } from "@udecode/plate";

export interface TextEditorWrapperRef {
    getCurrentContent: () => Value;
}

export const DRAFT_POST = 'draft_post'

const TextEditorWrapper = forwardRef<TextEditorWrapperRef>((props, ref) => {
    const editor = useCreateEditor();
    const hasInitialized = useRef(false);
    const contentRef = useRef<Value>([])

    useImperativeHandle(ref, () => ({
        getCurrentContent: () => contentRef.current
    }), []);

    const handleChange = useCallback(({ value }: { value: unknown }) => {
        console.log(value);
        Preferences.set({ key: DRAFT_POST, value: JSON.stringify(value) })

        contentRef.current = value as Value;
    }, [])

    const debounceHandleChange = useMemo(() => debounce(handleChange, 1000), [handleChange])

    const clearEditor = useCallback(() => {
        console.log('Clearing editor...');
        try {
            editor.tf.setValue([]);
            console.log('Editor cleared successfully');
        } catch (error) {
            console.error('Error clearing editor:', error);
        }
    }, [editor]);

    const loadLocalandInit = useCallback(async () => {
        if (hasInitialized.current) {
            console.log('Already initialized, skipping...');
            return;
        }

        try {
            const { value } = await Preferences.get({ key: DRAFT_POST })
            console.log('Preferences.get result:', value);
            
            if (value) {
                console.log('Found saved content, parsing...');
                try {
                    const content = JSON.parse(value);
                    console.log('Parsed content:', content);
                    editor.tf.setValue(content);
                    console.log('Content set successfully');
                } catch (parseError) {
                    console.error('Error parsing saved content:', parseError);
                    clearEditor();
                }
            } else {
                console.log('No saved content found, will clear editor');
                clearEditor();
            }
            
            hasInitialized.current = true;
        } catch (error) {
            console.error('Error in loadLocalandInit:', error);
            // Fallback: clear the editor even if Preferences fails
            clearEditor();
            hasInitialized.current = true;
        }
    }, [editor, clearEditor]);
        
    useEffect(() => {
        loadLocalandInit();
    }, [loadLocalandInit]);
    

    return (
        <Plate editor={editor} onChange={debounceHandleChange}>
            <FixedToolbar>
                <FixedToolbarButtons />
            </FixedToolbar>
            <EditorContainer>
                <Editor placeholder='What is on your mind?' />
            </EditorContainer>
        </Plate>
    )
});

TextEditorWrapper.displayName = 'TextEditorWrapper';

export default TextEditorWrapper;
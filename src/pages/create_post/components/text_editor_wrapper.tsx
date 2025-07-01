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

interface TextEditorWrapperProps {
    initialContent?: string;
    isEditMode?: boolean;
}

export const DRAFT_POST = 'draft_post'

const TextEditorWrapper = forwardRef<TextEditorWrapperRef, TextEditorWrapperProps>(({ initialContent, isEditMode = false }, ref) => {
    const editor = useCreateEditor();
    const hasInitialized = useRef(false);
    const contentRef = useRef<Value>([])

    useImperativeHandle(ref, () => ({
        getCurrentContent: () => contentRef.current
    }), []);

    const handleChange = useCallback(({ value }: { value: unknown }) => {
        if (!isEditMode) {
            Preferences.set({ key: DRAFT_POST, value: JSON.stringify(value) })
        }

        contentRef.current = value as Value;
    }, [isEditMode])

    const debounceHandleChange = useMemo(() => debounce(handleChange, 1000), [handleChange])

    const clearEditor = useCallback(() => {
        try {
            editor.tf.setValue([]);
        } catch (error) {
            console.error('Error clearing editor:', error);
        }
    }, [editor]);

    const loadLocalandInit = useCallback(async () => {
        if (hasInitialized.current) {
            return;
        }

        try {
            const { value } = await Preferences.get({ key: DRAFT_POST })
            
            if (value) {
                try {
                    const content = JSON.parse(value);
                    editor.tf.setValue(content);
                    contentRef.current = content;
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

    const loadInitialContent = useCallback(() => {
        if (hasInitialized.current) {
            return;
        }

        try {
            if (isEditMode && initialContent) {
                const content = JSON.parse(initialContent);
                editor.tf.setValue(content);
                contentRef.current = content;
            } else {
                loadLocalandInit();
                return;
            }
            
            hasInitialized.current = true;
        } catch (error) {
            console.error('Error loading initial content:', error);
            clearEditor();
            hasInitialized.current = true;
        }
    }, [editor, clearEditor, loadLocalandInit, initialContent, isEditMode]);
        
    useEffect(() => {
        loadInitialContent();
    }, [loadInitialContent]);
    

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
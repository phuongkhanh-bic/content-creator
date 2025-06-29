import React from 'react';
import { Editor } from '../ui/editor';
import { Plate } from '@udecode/plate/react';
import { EditorContainer } from '../ui/editor';

import { useCreateEditor } from '../editor/use-create-editor';
interface PostBodyProps {
    content: string;
}

const PostBody: React.FC<PostBodyProps> = ({content}) => {
    const editor = useCreateEditor(content ? JSON.parse(content) : []);

    return (
        <>
            <Plate editor={editor}>
                <EditorContainer>
                    <Editor className='p-1! text-black' placeholder='What is on your mind?' readOnly={true}/>
                </EditorContainer>
            </Plate>
        </>
    );
};

export default PostBody; 
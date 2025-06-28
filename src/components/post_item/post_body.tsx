import { cn } from '@/lib/utils';
import { IonImg } from '@ionic/react';
import React from 'react';
import { Editor } from '../ui/editor';
import { Plate } from '@udecode/plate/react';
import { EditorContainer } from '../ui/editor';

import { useCreateEditor } from '../editor/use-create-editor';
interface PostBodyProps {
    content: string;
    images: string[];
}

const PostBody: React.FC<PostBodyProps> = ({
    content,
    images,
}) => {
    const editor = useCreateEditor(content ? JSON.parse(content) : []);

    const getImageGridClass = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            
            default:
                return "grid-cols-2";
        }
    };

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
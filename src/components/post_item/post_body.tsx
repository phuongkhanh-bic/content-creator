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

            {images.length > 0 && (
                <>
                    <div className="h-3" />
                    <div className={cn(
                        "grid gap-1 rounded-lg overflow-hidden",
                        getImageGridClass(images.length)
                    )}>
                        {images.map((image, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    "relative",
                                    images.length === 3 && index === 0 && "row-span-2",
                                    images.length === 4 && "aspect-square"
                                )}
                            >
                                <IonImg
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default PostBody; 
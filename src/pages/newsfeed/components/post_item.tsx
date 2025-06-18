import { cn } from '@/lib/utils';
import { IonCard, IonImg, IonLabel, IonRouterLink } from '@ionic/react';
import React from 'react';

const PostItem: React.FC = () => {
    // Mock data - in real app, this would come from props
    const images = [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/601",
        "https://picsum.photos/800/602",
    ];

    const getImageGridClass = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-2";
            case 4:
                return "grid-cols-2";
            default:
                return "grid-cols-2";
        }
    };

    return (
        <IonCard className={cn("rounded-lg bg-white shadow-md flex flex-col border border-border")}>
            <IonRouterLink routerLink={''} routerDirection="forward">
                <div className="px-4 py-3">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <IonImg
                                src="https://picsum.photos/200/200"
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <IonLabel className="text-gray-700 text-base font-semibold">
                                {/* {article?.author} */}
                                John Doe
                            </IonLabel>
                            <IonLabel className="text-gray-500 text-xs">
                                {/* {formatDate(article?.createdAt)} */}
                                16/06/2025
                            </IonLabel>
                        </div>
                    </div>

                    <div className="h-3" />

                    <IonLabel className="line-clamp-2 text-gray-700 text-base">
                        {/* {article?.content} */}
                        This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit.
                        This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit.
                        This is the post content that can be multiple lines long and will be clamped to 2 lines if it exceeds the limit.
                    </IonLabel>

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
                </div>
            </IonRouterLink>
        </IonCard>
    );
};

export default PostItem;
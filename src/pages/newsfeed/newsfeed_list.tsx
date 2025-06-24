import PostItem from '@/components/post_item';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonList } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

const NewsfeedList: React.FC = () => {
    const history = useHistory();
    const posts = [
        {
            id: 1,
            content: `[{"type":"p","id":"97f0FFUqhE","children":[{"text":"koko"}]},{"type":"p","id":"SFZX20ob4w","children":[{"text":"okok';ko'"}]},{"type":"p","id":"Ft66LIpJ6l","children":[{"text":"dfgfdg fdg dfg dfgdfg dffgh 121334"}]},{"type":"p","id":"FNFvwyRnaE","children":[{"text":""}]},{"type":"p","id":"G2H5XnuMa_","children":[{"text":""}]}]`,
            createdAt: '2021-01-01',
            author: 'John Doe',
            avatar: 'https://picsum.photos/200/200',
            images: ['https://picsum.photos/200/200', 'https://picsum.photos/200/200', 'https://picsum.photos/200/200'],
            likes: 10,
            comments: 5,
            isLiked: false,
        },
        {
            id: 2,
            content: `[{"type":"p","id":"EZrFvmQwyB","children":[{"text":"why"}]},{"type":"h1","id":"IOCP2ZwZs1","children":[{"text":"haha"}]},{"type":"p","id":"JaPkhbJXvQ","children":[{"text":""}],"indent":1,"listStyleType":"decimal"},{"type":"p","id":"Jd8s8o7T3p","children":[{"text":"sfsf"}],"indent":1,"listStyleType":"disc"},{"type":"p","id":"Frsxt-BEgc","children":[{"text":"ff"}],"indent":1,"listStyleType":"decimal"},{"type":"p","id":"rMDtaz4ycb","children":[{"text":""}],"indent":1,"listStyleType":"decimal"},{"type":"p","id":"xxUnKKYVMr","children":[{"text":"sdsd"}]},{"type":"p","id":"yj4WrLgShj","children":[{"text":"erer"}],"indent":1,"listStyleType":"decimal"},{"type":"p","id":"6AZMS4-xqV","indent":1,"listStyleType":"decimal","children":[{"text":"dfdf"}]},{"type":"p","id":"ZslAyMAK3W","indent":1,"listStyleType":"decimal","children":[{"text":"dvbvb"}]},{"type":"p","id":"7xCI38lYAs","indent":1,"listStyleType":"decimal","children":[{"text":"1. sff"}]},{"type":"p","id":"j-UoJ_VmTY","indent":1,"listStyleType":"decimal","children":[{"text":"sfsdf"}]},{"type":"p","id":"qMfURHPMUn","children":[{"text":"fdf"}],"indent":1,"listStyleType":"disc"},{"type":"p","id":"jCPBkjDtQx","indent":1,"listStyleType":"disc","children":[{"text":"sdfsdf"}]},{"type":"p","id":"_taSc8m1GW","indent":1,"listStyleType":"disc","children":[{"text":"sfsdf"}],"listStart":2},{"type":"p","id":"zAfpwOPnkF","indent":1,"listStyleType":"disc","listStart":3,"children":[{"text":"sfsdf"}]},{"type":"p","id":"QJMFaKE_tU","children":[{"text":"hehe"}]},{"type":"p","id":"l5btHr1kB1","children":[{"text":"sfdsf"}],"indent":1,"listStyleType":"decimal"},{"type":"p","id":"aVLjD4np3h","indent":1,"listStyleType":"decimal","children":[{"text":"sd"}],"listStart":2},{"type":"p","id":"Ho5zIgwXyL","indent":1,"listStyleType":"decimal","listStart":3,"children":[{"text":"sd"}]},{"type":"p","id":"hEUZYyhrc-","indent":1,"listStyleType":"decimal","listStart":4,"children":[{"text":"f"}]}]`,
            createdAt: '2021-01-02',
            author: 'John Doe',
            avatar: 'https://picsum.photos/200/200',
            images: ['https://picsum.photos/200/200'],
            likes: 5,
            comments: 10,
            isLiked: false,
        },
        {
            id: 3,
            content: `[{"children":[{"text":"Draft post will be published soon"}],"type":"p","id":"6yXj02wVAY"}]`,
            createdAt: '2021-01-03',
            author: 'John Doe',
            avatar: 'https://picsum.photos/200/200',
            images: ['https://picsum.photos/200/200', 'https://picsum.photos/200/200'],
            likes: 10,
            comments: 5,
            isLiked: false,
        },
    ]

    const onReaction = (id: number, isLiked: boolean) => {
        console.log(`Post ${id} reaction: ${isLiked ? 'liked' : 'unliked'}`);
        // TODO: Implement reaction functionality with API call
    }
    
    const onComment = (id: number) => {
        history.push(`/post/${id}`)
    }

    const onEndReached = () => {
        console.log('onEndReached');
    }

    return (
        <>
            <IonList className="space-y-6 !pb-4">
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} onReaction={onReaction} onComment={onComment} />
                ))}
            </IonList>
            <IonInfiniteScroll onIonInfinite={onEndReached}>
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>
        </>
    );
};

export default NewsfeedList;
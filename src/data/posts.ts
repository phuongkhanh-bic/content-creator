export interface Post {
    id: number;
    content: string;
    createdAt: string;
    author: string;
    avatar: string;
    images: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
}

export const postsData: Post[] = [
    {
        id: 1,
        content: `[{"type":"p","id":"97f0FFUqhE","children":[{"text":"koko"}]},{"type":"p","id":"SFZX20ob4w","children":[{"text":"okok';ko'"}]},{"type":"p","id":"Ft66LIpJ6l","children":[{"text":"dfgfdg fdg dfg dfgdfg dffgh 121334"}]}]`,
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
    {
        id: 4,
        content: `[{"type":"p","id":"abc123","children":[{"text":"This is a sample post with multiple paragraphs and rich content."}]},{"type":"h2","id":"def456","children":[{"text":"Key Features"}]},{"type":"p","id":"ghi789","children":[{"text":"• Modern UI design"}],"indent":1,"listStyleType":"disc"},{"type":"p","id":"jkl012","children":[{"text":"• Responsive layout"}],"indent":1,"listStyleType":"disc"},{"type":"p","id":"mno345","children":[{"text":"• Interactive components"}],"indent":1,"listStyleType":"disc"}]`,
        createdAt: '2021-01-04',
        author: 'Jane Smith',
        avatar: 'https://picsum.photos/200/201',
        images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/301'],
        likes: 25,
        comments: 8,
        isLiked: true,
    },
    {
        id: 5,
        content: `[{"type":"p","id":"pqr678","children":[{"text":"Just finished an amazing project! Here are some highlights from the development process."}]},{"type":"p","id":"stu901","children":[{"text":"The challenges we faced and how we overcame them made this journey truly rewarding."}]}]`,
        createdAt: '2021-01-05',
        author: 'Mike Johnson',
        avatar: 'https://picsum.photos/200/202',
        images: [],
        likes: 18,
        comments: 12,
        isLiked: false,
    }
];

// Helper functions to simulate database operations
export const getPostById = (id: number): Post | undefined => {
    return postsData.find(post => post.id === id);
};

export const getAllPosts = (): Post[] => {
    return [...postsData];
};

export const updatePostLikes = (id: number, isLiked: boolean): Post | undefined => {
    const post = postsData.find(p => p.id === id);
    if (post) {
        post.isLiked = isLiked;
        post.likes = isLiked ? post.likes + 1 : post.likes - 1;
    }
    return post;
}; 
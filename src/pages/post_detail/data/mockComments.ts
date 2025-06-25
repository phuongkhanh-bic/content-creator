export interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
    likes: number;
}

export const mockComments: Comment[] = [
    {
        id: 1,
        author: "Alice Johnson",
        avatar: "https://picsum.photos/200/201",
        content: "This is amazing! Love the content you're sharing.",
        createdAt: "2 hours ago",
        likes: 5
    },
    {
        id: 2,
        author: "Bob Smith",
        avatar: "https://picsum.photos/200/202",
        content: "Great post! Thanks for sharing this information.",
        createdAt: "1 hour ago",
        likes: 3
    },
    {
        id: 3,
        author: "Carol Davis",
        avatar: "https://picsum.photos/200/203",
        content: "I completely agree with your point of view. Well said!",
        createdAt: "30 minutes ago",
        likes: 7
    }
]; 
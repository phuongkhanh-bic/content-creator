import CommentList from '@/components/comment/comment_list';
import { Comment } from '@/types/comment';

interface CommentsSectionProps {
    comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
    comments,
}) => {
    return (
        <>
            {/* Comments List */}
            <div className="bg-white rounded-lg shadow-md border border-border mt-4">
                <div className="px-4 py-3 border-b border-gray-100">
                    <span className="text-gray-700 font-semibold text-base">
                        Comments ({comments.length})
                    </span>
                </div>
                <CommentList comments={comments}/>
            </div>
            
            {/* Bottom spacing to ensure last comment is visible */}
            <div className="h-20"></div>
        </>
    );
};

export default CommentsSection; 
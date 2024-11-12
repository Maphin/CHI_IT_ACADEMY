import { Typography } from "@mui/material";
import React from "react";
import { IComment } from "../../types/IComment";
import Comment from "./Comment";

interface CommentListProps {
  comments: IComment[] | null;
  onCommentDelete: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onCommentDelete }) => {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onCommentDelete={onCommentDelete}/>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments yet.
        </Typography>
      )}
    </>
  );
};

export default CommentList;

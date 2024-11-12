import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { IComment } from '../../types/IComment';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useRequest } from 'ahooks';
import { CommentsAPI } from '../../api/commentsAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const StyledComment = styled(Box)({
    padding: "10px 15px",
    borderRadius: "8px",
    backgroundColor: "#F8F8FF",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#F0F8FF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
});

interface CommentProps {
    comment: IComment;
    onCommentDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onCommentDelete }) => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  
    const { run: removeComment, loading } = useRequest(
      async () => CommentsAPI.deleteComment(comment.id),
      {
        manual: true,
        onSuccess: () => {
          onCommentDelete();
        }
      }
    )

    const handleDeleteComment = () => {
      removeComment();
    }
    return (
        <StyledComment key={comment.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" fontWeight="bold" color="text.primary" component={'div'}>
              {comment.user.username}
              <Typography variant="body2" color="text.secondary">
              {comment.text}
              </Typography>
            </Typography>
            {userId === comment.user.id && (
              <IconButton
                onClick={handleDeleteComment}
                aria-label="delete comment"
                color="error"
                disabled={loading}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
        </StyledComment>
    )
};

export default Comment;
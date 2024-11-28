import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { IComment } from '../../types/IComment';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useRequest } from 'ahooks';
import { CommentsAPI } from '../../api/commentsAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AvatarHeader from '../common/AvatarHeader';

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
  exhibitID: number;
  onCommentDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, exhibitID, onCommentDelete }) => {
  const userId = useSelector((state: RootState) => state.user.user?.id);

  const { run: removeComment, loading } = useRequest(
    async () => CommentsAPI.deleteComment(comment.id, exhibitID),
    {
      manual: true,
      onSuccess: () => {
        onCommentDelete();
      }
    }
  );

  const handleDeleteComment = () => {
    removeComment();
  };

  return (
    <StyledComment key={comment.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <AvatarHeader
          username={comment.user.username}
          createdAt={comment.createdAt}
          avatarSize={30}
          usernameFontSize="1rem"
          userNameFontWeight="bold"
          usernameVariant="body1"
          dateFontSize="0.75rem"
          dateVariant="caption"
          dateFontStyle="italic"
          padding={0}
          marginRight={1.5}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, ml: 0.5}}>
          {comment.text}
        </Typography>
      </Box>
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

  );
};

export default Comment;

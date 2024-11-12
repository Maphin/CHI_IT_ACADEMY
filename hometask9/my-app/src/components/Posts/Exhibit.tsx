import React, { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Collapse,
} from "@mui/material";
import { IExhibit } from "../../types/IExhibit";
import { useRequest } from "ahooks";
import { CommentsAPI } from "../../api/commentsAPI";
import { IComment } from "../../types/IComment";
import AddCommentForm from "../Comments/AddCommentForm";
import CommentList from "../Comments/CommentList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ExhibitsAPI } from "../../api/exhibitsAPI";
import AvatarHeader from "./AvatarHeader";
import ActionsBar from "./ActionsBar";

interface ExhibitProps {
  exhibit: IExhibit;
  loadExhibits: () => void;
}

const Exhibit: React.FC<ExhibitProps> = ({ exhibit, loadExhibits }) => {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const { run: loadComments, loading: commentsLoading, error } = useRequest(
    () => CommentsAPI.comments(exhibit.id),
    {
      onSuccess: (response) => setComments(response.data),
    }
  );

  const { run: removeExhibit, loading: removeLoading } = useRequest(
    () => ExhibitsAPI.deleteExhibit(exhibit.id),
    {
      manual: true,
      onSuccess: loadExhibits,
      onError: (err) => console.error("Failed to delete post", err),
    }
  )

  const onCommentAdd = useCallback(() => {
    loadComments();
    setShowAddComment(false);
  }, [loadComments]);

  const toggleExpand = useCallback(() => setExpanded((prev) => !prev), []);
  const toggleAddComment = useCallback(() => setShowAddComment((prev) => !prev), []);
  const isExhibitOwner = userId === exhibit.user.id;

  return (
    <Card key={exhibit.id} sx={{ boxShadow: 3, maxWidth: 800, display: 'block', mx: 'auto', mb: 3 }}>
      <AvatarHeader username={exhibit.user.username} createdAt={exhibit.createdAt}/>
      
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_API_BASE_URL}${exhibit.imageUrl}`}
        alt="Exhibit image"
        sx={{
          width: "100%",
          objectFit: "cover",
          borderRadius: "4px 4px 0 0",
        }}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          {exhibit.description}
        </Typography>
        <Typography variant="h6" color="textPrimary" sx={{ mb: 2 }}>
          {comments ? `${comments.length} comments` : "No comments yet."}
        </Typography>

        {commentsLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Failed to load comments. Please try again.
          </Typography>
        )}

        <ActionsBar 
          expanded={expanded} 
          toggleExpand={toggleExpand} 
          showAddComment={showAddComment} 
          toggleAddComment={toggleAddComment} 
          onDelete={removeExhibit}
          isOwner={isExhibitOwner}
          isDeleting={removeLoading}
          />

        <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
          <CommentList comments={comments} onCommentDelete={loadComments}/>
        </Collapse>

        {showAddComment && <AddCommentForm exhibitID={exhibit.id} onSuccess={onCommentAdd} isAuthenticated={isAuthenticated}/>}
      </CardContent>
    </Card>
  );
};

export default Exhibit;
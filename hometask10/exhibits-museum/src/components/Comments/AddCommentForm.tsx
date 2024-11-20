import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRequest } from "ahooks";
import React, { useState } from "react";
import { CommentsAPI } from "../../api/commentsAPI";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useRouter } from "next/navigation";

interface AddCommentFormProps {
    exhibitID: number;
    onSuccess: () => void;
    isAuthenticated: boolean;
  }

const AddCommentForm: React.FC<AddCommentFormProps> = ({ exhibitID, onSuccess, isAuthenticated }) => {
    const [newComment, setNewComment] = useState<string>("");
    const router = useRouter();

    const { run: addComment, loading: addingComment } = useRequest(
        async () => await CommentsAPI.createComment(exhibitID, newComment),
        {
            manual: true,
            onSuccess: () => {
                onSuccess();
                setNewComment("");
            },
            onError: (err) => {
                console.log("Failed to add comment", err);
            }
        }
    );

    const handleSubmit = () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (newComment.trim()) addComment();
    }

    return (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <TextField
                fullWidth
                label="Add a comment"
                variant="outlined"
                size="small"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mr: 1 }}
                autoFocus={true}
            />
            <Button 
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={addingComment || !newComment.trim()}
            >
              {addingComment ? <CircularProgress size={24} /> : <SendRoundedIcon />}
            </Button>
        </Box>
    )
}

export default AddCommentForm;
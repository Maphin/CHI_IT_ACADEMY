import { CardActions, IconButton } from "@mui/material";
import React from "react";
import ExpandMoreButton from "../common/ExpandMoreButton";
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface ActionsBarProps {
    expanded: boolean;
    toggleExpand: () => void;
    showAddComment: boolean;
    toggleAddComment: () => void;
    onDelete: () => void;
    isOwner: boolean;
    isDeleting: boolean;
}

const ActionsBar: React.FC<ActionsBarProps> = ({ expanded, toggleExpand, showAddComment, toggleAddComment, onDelete, isOwner, isDeleting }) => {
    return (
        <CardActions>
            <ExpandMoreButton expanded={expanded} onClick={toggleExpand} />
            <IconButton 
                onClick={toggleAddComment} 
                color={showAddComment ? "primary" : "default"}>
                <AddCommentIcon />
            </IconButton>
            {isOwner && (
            <IconButton onClick={onDelete} color="error" disabled={isDeleting}>
                <DeleteForeverRoundedIcon />
            </IconButton>
            )}
    </CardActions>
    )
}

export default ActionsBar;
import { IconButton, IconButtonProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

interface ExpandMoreButtonProps extends IconButtonProps {
    expanded: boolean;
    onClick: () => void;
}

const ExpandMoreButton: React.FC<ExpandMoreButtonProps> = ({ expanded, onClick }) => {
    return (
        <IconButton
        onClick={onClick}
        aria-expanded={expanded}
        aria-label="show more"
        sx={{
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s",
          marginLeft: "auto",
        }}
      >
        <ExpandMoreIcon />
      </IconButton>
    )
}

export default ExpandMoreButton;
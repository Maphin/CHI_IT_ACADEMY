import { Avatar, Box, CardContent, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { format } from 'date-fns';
import React from 'react';

interface AvatarHeaderProps {
    username: string;
    createdAt: string
}

const AvatarHeader: React.FC<AvatarHeaderProps> = ({ username, createdAt }) => {
    const firstLetter = username[0].toUpperCase();
    const formattedDate = format(new Date(createdAt), "MMM dd, yyyy hh:mm a");

    return (
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
                alt={username}
                sx={{ width: 40, height: 40, mr: 2, bgcolor: deepOrange[500]}}
                >
                {firstLetter}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6">
                {username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {formattedDate}
            </Typography>
            </Box>
      </CardContent>
    )
}

export default AvatarHeader;
import { Avatar, Box, CardContent, Typography, TypographyProps } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { useFormatDate } from '../../hooks/useFormatDate';

interface AvatarHeaderProps {
  username: string;
  createdAt: string;
  avatarSize?: number;
  usernameFontSize?: string;
  userNameFontWeight?: string;
  usernameVariant?: TypographyProps['variant'];
  dateFontSize?: string;
  dateVariant?: TypographyProps['variant'];
  dateFontStyle?: string;
  padding?: number;
  marginRight?: number;
}

const AvatarHeader: React.FC<AvatarHeaderProps> = ({
  username,
  createdAt,
  avatarSize = 40,
  usernameFontSize = '20px',
  usernameVariant = 'h6',
  userNameFontWeight = 'medium',
  dateFontSize = '0.875rem',
  dateVariant = 'body2',
  dateFontStyle = 'normal',
  padding = 2,
  marginRight = 2
}) => {
  const firstLetter = username[0].toUpperCase();
  const formattedDate = useFormatDate(createdAt);

  return (
    <CardContent sx={{ display: "flex", alignItems: "center", padding: padding }}>
      <Avatar
        alt={username}
        sx={{ width: avatarSize, height: avatarSize, mr: marginRight, bgcolor: deepOrange[500], fontSize: avatarSize * 0.5 }}
      >
        {firstLetter}
      </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant={usernameVariant} sx={{ fontSize: usernameFontSize, fontWeight: userNameFontWeight }}>
          {username}
        </Typography>
        <Typography
          variant={dateVariant}
          color="text.secondary"
          sx={{ fontSize: dateFontSize, fontStyle: dateFontStyle }}
        >
          {formattedDate}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default AvatarHeader;

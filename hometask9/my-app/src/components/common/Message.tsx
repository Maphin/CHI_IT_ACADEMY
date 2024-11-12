import { Typography } from "@mui/material";

const Message: React.FC<{ text: string }> = ({ text }) => (
    <Typography color="textSecondary" align="center">
      {text}
    </Typography>
);

export default Message;
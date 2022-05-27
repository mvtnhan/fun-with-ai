import { FC, PropsWithChildren } from 'react';

import { Paper, Typography } from '@mui/material';

import Typing from './Typing';

export type MessageProps = {
  isTyping?: boolean;
  isMine?: boolean;
};

const Message: FC<PropsWithChildren<MessageProps>> = ({
  isMine,
  isTyping,
  children,
}) => {
  return (
    <Paper
      sx={{
        color: isMine ? "#fff" : "#000",
        width: "fit-content",
        maxWidth: "65%",
        padding: "0.75rem 1rem",
        backgroundColor: isMine ? "#9155fd" : "#fff",
        ...(isMine ? { borderTopRightRadius: 0 } : { borderTopLeftRadius: 0 }),
      }}
    >
      {isTyping ? (
        <Typing />
      ) : (
        <Typography variant="body1">{children}</Typography>
      )}
    </Paper>
  );
};

export default Message;

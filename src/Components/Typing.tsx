import './Typing.css';

import { FunctionComponent } from 'react';

import { Box } from '@mui/material';

export type TypingProps = {};

const Typing: FunctionComponent<TypingProps> = () => {
  return (
    <Box p="0.5rem 1rem">
      <Box className="dot-flashing" />
    </Box>
  );
};

export default Typing;

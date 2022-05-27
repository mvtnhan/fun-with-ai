import * as React from 'react';

import AttachmentIcon from '@mui/icons-material/Attachment';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton, OutlinedInput, Paper, Stack } from '@mui/material';

import { Engine, sendRequest } from '../api';
import { useAppContext } from '../Context/AppContext';
import Avatar from './Avatar';
import Message from './Message';

const Chat: React.FunctionComponent<unknown> = () => {
  const { model, messages, addMessage } = useAppContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const [isYourTurn, setIsYourTurn] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");

  React.useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  React.useEffect(() => {
    if (!isYourTurn && model.engine !== Engine.DAVINCI) {
      sendRequest({ engine: model.engine, prompt: inputValue }).then((res) => {
        addMessage({ message: res.choices[0].text, created: res.created });
        setIsYourTurn(true);
      });
    }
  }, [isYourTurn, model.engine, addMessage, inputValue]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;

    addMessage({ message: inputRef.current.value });
    setInputValue(inputRef.current.value);
    inputRef.current.value = "";
    setIsYourTurn(false);
  };

  return (
    <>
      <Stack
        flexGrow={1}
        p={2}
        spacing={2}
        sx={{ overflowY: "auto", scrollBehavior: "smooth", height: "100%" }}
      >
        {messages.map((msg, index) => {
          const isMine = !msg.isResponse;
          return (
            <Stack
              direction={isMine ? "row-reverse" : "row"}
              spacing={2}
              key={index}
            >
              <Avatar
                src={isMine ? "../img/avatar/mine.png" : model.avatar}
                sx={{ height: 32, width: 32 }}
              />
              <Message isMine={isMine}>{msg.message}</Message>
            </Stack>
          );
        })}
        {!isYourTurn && model.engine !== Engine.DAVINCI && (
          <Stack direction={"row"} spacing={2}>
            <Avatar src={model.avatar} sx={{ height: 32, width: 32 }} />
            <Message isTyping />
          </Stack>
        )}
        <div ref={bottomRef} />
      </Stack>
      <Paper sx={{ m: 2, p: 1 }}>
        <form onSubmit={handleSubmit}>
          <OutlinedInput
            size="small"
            autoFocus
            fullWidth
            placeholder="Type your mesage here..."
            sx={{ fieldset: { border: "none" } }}
            inputRef={inputRef}
          />
          <IconButton>
            <MicIcon />
          </IconButton>
          <IconButton>
            <AttachmentIcon />
          </IconButton>
        </form>
      </Paper>
    </>
  );
};

export default Chat;

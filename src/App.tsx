import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import {
    Box, Container, Drawer, Grid, Hidden, IconButton, Paper, Stack, Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

import Avatar from './Components/Avatar';
import Chat from './Components/Chat';
import SideBar from './Components/SideBar';
import { useAppContext } from './Context/AppContext';

function App() {
  const { isDrawerOpen, toggleDrawer } = useAppContext();
  return (
    <Box sx={{ bgColor: "#F4F5FA" }}>
      <Container>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 2rem)",
            m: 2,
            position: "relative",
          }}
          id="drawer-container"
        >
          <Grid container direction="row" height="100%">
            <Grid item md={4} display={{ xs: "none", md: "flex" }}>
              <SideBar />
            </Grid>
            <Grid item md={8} xs={12} height="100%">
              <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                PaperProps={{ style: { position: "absolute", width: "350px" } }}
                BackdropProps={{ style: { position: "absolute" } }}
                ModalProps={{
                  container: document.getElementById("drawer-container"),
                  style: { position: "absolute" },
                }}
                sx={{
                  ".MuiDrawer-paper": { borderRadius: 0 },
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <SideBar />
              </Drawer>
              <Stack bgcolor="#F7F7F8" height="100%">
                <ChatHeader />
                <Chat />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;

function ChatHeader() {
  const { model, toggleDrawer } = useAppContext();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={`1px solid ${grey[300]}`}
    >
      <Stack
        direction="row"
        spacing={2}
        p="0.75rem 1.25rem"
        alignItems="center"
      >
        <Hidden mdUp>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Hidden>
        <Avatar alt={model.name} src={model.avatar} status={model.status} />
        <Stack>
          <Typography variant="subtitle1" fontWeight={500} lineHeight={1.2}>
            {`${model.name} (${model.engine})`}
          </Typography>
          <Hidden mdDown>
            <Typography variant="caption" color={grey[500]}>
              {`${model.level} - ${model.desc}`}
            </Typography>
          </Hidden>
        </Stack>
      </Stack>
      <Stack direction="row" display={{ xs: "none", sm: "flex" }}>
        <IconButton>
          <PhoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <VideocamOutlinedIcon />
        </IconButton>
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

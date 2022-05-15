import { useState } from 'react';

import { Box, Button, Grid, TextField } from '@mui/material';

type Respone = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
};

type DataItem = {
  id: string;
  created: number;
  prompt: string;
  sesponse: string;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [dataArray, setDataArray] = useState<DataItem[]>([]);

  const dataPost = {
    prompt: `${query}`,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
  const url = "https://api.openai.com/v1/engines/text-curie-001/completions";

  async function postData(data = {}) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${url}`, requestOptions);
    const result: Respone = await response.json();

    const dataAObj = {
      id: result.id,
      created: result.created,
      prompt: query,
      sesponse: result.choices[0].text,
    };

    const newData = [...dataArray, dataAObj];

    setDataArray(
      newData.sort((a, b) => {
        return b.created - a.created;
      })
    );
    setQuery("");
    return result;
  }

  return (
    <Box
      sx={{
        width: 800,
        mt: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Fun with AI</h1>
      <TextField
        type="text"
        label="Enter Prompt"
        multiline
        rows={8}
        placeholder="Please enter your question..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        focused
      />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            postData(dataPost);
          }}
        >
          Submit
        </Button>
      </Box>

      {dataArray.map((item, index) => (
        <Box key={index}>
          <Grid
            container
            spacing={0}
            sx={{
              p: 2,
              backgroundColor: "rgb(228, 228, 228)",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Grid item xs={4}>
              Prompt:
            </Grid>
            <Grid item xs={8}>
              {item.prompt}
            </Grid>

            <Grid item xs={4} sx={{ mt: 1 }}>
              Response:
            </Grid>
            <Grid item xs={8} sx={{ mt: 1 }}>
              {item.sesponse}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default App;

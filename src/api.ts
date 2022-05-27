import { Status } from './Components/Avatar';

export const defaultEngine = "text-ada-001";
export enum Engine {
  ADA = "text-ada-001",
  BABBAGE = "text-babbage-001",
  CURIE = "text-curie-001",
  DAVINCI = "text-davinci-002",
}

export type Model = {
  name: string;
  engine: Engine;
  price: number;
  desc: string;
  level: string;
  avatar: string;
  status: Status;
};
export const Models = [
  {
    name: "Ada",
    engine: Engine.ADA,
    price: 0.0008,
    level: "Junior",
    desc: "The fastest model with simple tasks at lowest cost.",
    avatar: "/img/avatar/1.png",
    status: Status.ONLINE,
  },
  {
    name: "Babbage",
    engine: Engine.BABBAGE,
    price: 0.0012,
    level: "Senior",
    desc: "Capable of straightforward tasks, very fast, and lower cost.",
    avatar: "/img/avatar/2.png",
    status: Status.ONLINE,
  },
  {
    name: "Curie",
    engine: Engine.CURIE,
    price: 0.006,
    desc: "Very capable, but faster and lower cost than Davinci.",
    level: "Principal",
    avatar: "/img/avatar/3.png",
    status: Status.ONLINE,
  },
  {
    name: "Davinci",
    engine: Engine.DAVINCI,
    price: 0.06,
    desc: "Most powerful. Can do any task with less context.",
    level: "Expert - 🏝 Vacationing",
    avatar: "/img/avatar/4.png",
    status: Status.BUSY,
  },
];

export type Request = {
  engine: Engine;
  prompt: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
};

export type Response = {
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

export const sendRequest = async ({
  engine = Engine.ADA,
  prompt,
  temperature = 0.5,
  max_tokens = 64,
  top_p = 1.0,
  frequency_penalty = 0.0,
  presence_penalty = 0.0,
}: Request): Promise<Response> => {
  const response = await fetch(
    `https://api.openai.com/v1/engines/${engine}/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify({
        prompt,
        temperature,
        max_tokens,
        top_p,
        frequency_penalty,
        presence_penalty,
      }),
    }
  );

  return response.json();
};

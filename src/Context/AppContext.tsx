import * as React from 'react';
import createPersistedState from 'use-persisted-state';

import { useMediaQuery, useTheme } from '@mui/material';

import { Engine, Model, Models } from '../api';

export type Message = {
  message: string;
  created?: number;
  isResponse?: boolean;
};
type AppContextState = {
  isDrawerOpen: boolean;
  model: Model;
  messages: {
    [key in Engine]?: Message[];
  };
};

type AppContextValue = {
  state: AppContextState;
  setState: React.Dispatch<React.SetStateAction<AppContextState>>;
};

const useMessages =
  createPersistedState<AppContextState["messages"]>("messages");

export const AppContext = React.createContext<AppContextValue | undefined>(
  undefined
);

export const AppProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [localData] = useMessages({});
  const [state, setState] = React.useState({
    isDrawerOpen: false,
    model: Models[0],
    messages: localData,
  });
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const [, setLocalData] = useMessages({});
  const { state, setState } = React.useContext(AppContext) || {};
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  if (!state || !setState) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  const setModel = (engine: Engine) => {
    setState((s) => ({
      ...s,
      model: Models.find((m: Model) => m.engine === engine) || state.model,
    }));
  };

  const addMessage = React.useCallback(
    (message: Message) => {
      const newMsg = {
        ...message,
        isResponse: !!message.created,
        created: message.created || Math.round(new Date().getTime() / 1000),
      };

      setState((s) => {
        const engineMessages = s.messages[s.model.engine] || [];
        return {
          ...s,
          messages: {
            ...s.messages,
            [state.model.engine]: engineMessages.concat(newMsg),
          },
        };
      });

      setLocalData((s: AppContextState["messages"]) => {
        const engineMessages = s[state.model.engine] || [];
        return {
          ...s,
          [state.model.engine]: engineMessages.concat(newMsg),
        };
      });
    },
    [setLocalData, setState, state.model.engine]
  );

  const lastMsgWith = (engine: Engine): Message["message"] => {
    const msgByEngine = state.messages[engine] || [];
    return msgByEngine[msgByEngine.length - 1]?.message;
  };

  const toggleDrawer = () => {
    if (mdUp) return;
    setState((s) => ({ ...s, isDrawerOpen: !s.isDrawerOpen }));
  };

  return {
    isDrawerOpen: state.isDrawerOpen,
    toggleDrawer,
    model: state.model,
    setModel,
    messages: state.messages[state.model.engine] || [],
    addMessage,
    lastMsgWith,
  };
};

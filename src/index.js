import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from './contexts/UserContext';
import './index.css';

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'Karla, sans-serif',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <UserContext>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </UserContext>
    </MantineProvider>
  </React.StrictMode>
);

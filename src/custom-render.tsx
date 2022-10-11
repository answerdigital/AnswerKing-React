import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      retry: false,
    },
  },
});
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => undefined,
});

interface Props {
  children: ReactNode;
}

export function Wrapper({ children }: Props): ReactElement {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Router>
  );
}

export const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: Wrapper, ...options });

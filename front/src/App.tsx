import React from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

import { QueryClient, QueryClientProvider } from "react-query";
import Test from "./components/test";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
  );
}

export default App;

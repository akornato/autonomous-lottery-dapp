import React from "react";
import { StoreProvider } from "@hooks/useStore";

const App = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;

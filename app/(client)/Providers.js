"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../../context/AuthContext";
import React from "react";

const theme = extendTheme({
  colors: {
    main: "#3182CE",
  },
});

const Providers = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
};

export default Providers;

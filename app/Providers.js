"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

const theme = extendTheme({
  colors: {
    brand: {
      500: "#EF2689",
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
        // outline: {
        //   borderColor: "brand.500",
        //   color: "brand.500",
        //   _hover: {
        //     bg: "brand.500",
        //     color: "white",
        //   },
        // },
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
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

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      900: "#1a365d",
      orange: "#FF7A64",
      700: "#2a69ac",
    },
  },
});

import * as React from "react";
import { Image, useColorMode } from "@chakra-ui/react";
import logoDarkMode from "./up-logo.png";
import logoLightMode from "./up-logo-light.png";

export const Logo = () => {
  const { colorMode } = useColorMode();
  const logo = colorMode === "light" ? logoLightMode : logoDarkMode;
  return <Image boxSize="70px" src={logo} />;
};

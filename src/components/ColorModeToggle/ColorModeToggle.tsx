import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import React from "react";

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const label = colorMode === "light" ? "Go dark" : "Go light";
  return <Button onClick={toggleColorMode}>{label}</Button>;
};

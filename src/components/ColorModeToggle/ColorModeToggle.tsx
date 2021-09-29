import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import React from "react";
import Icon from "@chakra-ui/icon";

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <IoMoonSharp /> : <IoSunnySharp />}
    />
  );
};

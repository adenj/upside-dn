import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  useColorMode,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import {
  IoSettingsSharp,
  IoLogOutOutline,
  IoSunnySharp,
  IoMoonSharp,
} from "react-icons/io5";
import { supabase } from "../../supabaseClient";

const logout = () => {
  supabase.auth.signOut();
};

export const UserMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === "light" ? IoMoonSharp : IoSunnySharp;
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Menu"
        icon={<FaUserCircle />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem
          closeOnSelect={false}
          onClick={toggleColorMode}
          icon={<Icon />}
        >
          Toggle Color Mode
        </MenuItem>
        <MenuItem as={Link} to="/settings" icon={<IoSettingsSharp />}>
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout} icon={<IoLogOutOutline />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

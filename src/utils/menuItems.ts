import {
  UserIcon,
  SettingsIcon,
  LayoutDashboardIcon,
  FilePenIcon,
} from "lucide-react";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    route: "/",
  },
  {
    id: 2,
    title: "My Applications",
    icon: FilePenIcon,
    route: "/",
  },
  {
    id: 3,
    title: "Profile",
    icon: UserIcon,
    route: "/profile",
    disabled: true,
  },
  {
    id: 4,
    title: "Settings",
    icon: SettingsIcon,
    route: "/settings",
    disabled: true,
  },
];

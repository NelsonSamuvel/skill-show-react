import {
    UserIcon,
    LogOutIcon,
    SearchIcon,
    LayoutDashboardIcon,
    UserPlusIcon,
    LogInIcon,
} from "lucide-react";

export const profileMenu = [
    {
        id: "profile",
        label: "Profile",
        value: "profile",
        icon: UserIcon,
    },
    {
        id: "logout",
        label: "Logout",
        value: "logout",
        icon: LogOutIcon,
    },
];

export const menuData = [
    {
        id: "browse",
        label: "Browse",
        value: "browse",
        icon: SearchIcon,
    },
    {
        id: "dashboard",
        label: "Dashboard",
        value: "dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        id: "signup",
        label: "Signup",
        value: "signup",
        icon: UserPlusIcon,
    },
    {
        id: "login",
        label: "Login",
        value: "login",
        icon: LogInIcon,
    },
];
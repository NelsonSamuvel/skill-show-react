import {
    UserIcon,
    LogOutIcon,
    SearchIcon,
    LayoutDashboardIcon,
    UserPlusIcon,
    LogInIcon,
    ArrowLeft,
    ChevronLeft,
    Book,
    Hammer,
    Package,
} from "lucide-react";

export const profileMenu = [
    {
        id: "profile",
        label: "Profile",
        value: "profile",
        icon: ChevronLeft,
        children: [
            {
                id: "info",
                label: "Edit Basic Info",
                value: "edit-basic",
                icon: Book,
                link: '/profile/basic/update'
            },
            {
                id: "skills",
                label: "Edit Skills",
                value: "edit-skills",
                icon: Hammer,
                link: 'profile/skills/update'
            },
            {
                id: "projects",
                label: "Edit Projects",
                value: "edit-projects",
                icon: Package,
            }
        ]
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
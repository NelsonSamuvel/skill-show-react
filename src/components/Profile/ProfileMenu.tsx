import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { profileMenu } from "@/data/menuData";
import type { LucideProps } from "lucide-react";
import { signOut } from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUiStore, type UiStateType } from "@/store/useUiStore";
import {
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@radix-ui/react-menubar";
import { useAuthSession } from "@/hooks/useAuthSession";

type ItemType = {
  id: string;
  label: string;
  value: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const ProfileMenu = () => {
  const navigate = useNavigate();

  const setIsLoading = useUiStore(
    (state: UiStateType) => state.setIsGlobalLoading
  );

  const handleLogout = async (item: ItemType) => {
    if (item.value === "logout") {
      try {
        setIsLoading(true);
        const { error } = await signOut();
        if (error) {
          throw new Error(error.message);
        }
        localStorage.removeItem("mode");
        toast.success("Logged out Successfully");

        navigate("/");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    } else if (item.value === "profile") {
      navigate("/profile/123/update");
    }
  };

  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-0 border-none focus:outline-none focus:ring-2 focus:ring-[#0e9f6e] focus:ring-offset-2 transition-all duration-200 hover:scale-105">
          <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-surface hover:ring-[#0e9f6e] transition-all duration-300 shadow-sm hover:shadow-md">
            <AvatarImage src="/user.svg" className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-[#0e9f6e] to-emerald-600 text-white font-semibold text-sm">
              User
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>

        <MenubarContent className="mr-4 bg-surface min-w-[12rem] border border-surface shadow-lg rounded-lg p-1 animate-in fade-in-0 zoom-in-95">
          {profileMenu.map((item) =>
            item.children ? (
              <MenubarSub key={item.id}>
                <MenubarSubTrigger className="flex items-center gap-3 w-full px-3 py-2 text-sm text-white hover:bg-surface rounded-md transition-colors duration-200 cursor-pointer focus:outline-none focus:bg-[#0e9f6e] focus:text-white">
                  <MenubarShortcut className="ml-0 opacity-70">
                    <item.icon className="w-4 h-4" />
                  </MenubarShortcut>
                  <span className="font-medium">{item.label}</span>
                </MenubarSubTrigger>

                <MenubarSubContent className="bg-surface min-w-[10rem] border border-surface rounded-lg shadow-lg p-1 ml-2 animate-in fade-in-0 zoom-in-95">
                  {item.children.map((subItem) => (
                    <MenubarItem
                      asChild
                      key={subItem.id}
                      className="flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-surface rounded-md transition-colors duration-200 cursor-pointer focus:outline-none focus:bg-[#0e9f6e] focus:text-white"
                    >
                      <Link to={subItem.link || "/"}>
                        <span className="font-medium">{subItem.label}</span>
                        <MenubarShortcut className="opacity-70">
                          <subItem.icon className="w-4 h-4" />
                        </MenubarShortcut>
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarSub>
            ) : (
              <MenubarItem
                onClick={() => handleLogout(item)}
                key={item.id}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md transition-all duration-200 cursor-pointer focus:outline-none ${
                  item.value === "logout"
                    ? "text-red-400 hover:bg-red-900/20 focus:bg-red-900/30"
                    : "text-white hover:bg-surface focus:bg-[#0e9f6e] focus:text-white"
                }`}
              >
                <MenubarShortcut className="ml-0 opacity-70">
                  <item.icon className="w-4 h-4" />
                </MenubarShortcut>
                <span className="flex-1 font-medium">{item.label}</span>
              </MenubarItem>
            )
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;

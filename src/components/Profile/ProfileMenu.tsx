import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/UI/menubar";

import { Avatar, AvatarImage, AvatarFallback } from "../UI/avatar";
import { profileMenu } from "@/data/menuData";
import type { LucideProps } from "lucide-react";
import { signOut } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUiStore, type UiStateType } from "@/store/useUiStore";

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
      navigate("/profile");
    }
  };
  

  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-0">
          <Avatar className="cursor-pointer">
            <AvatarImage src="/user.svg" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="mr-4 bg-surface min-w-[8rem]">
          {profileMenu.map((item) => (
            <MenubarItem
              onClick={() => handleLogout(item)}
              key={item.id}
              className="text-right focus:bg-stone-100/10"
            >
              {item.label}
              <MenubarShortcut>
                <item.icon />
              </MenubarShortcut>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;

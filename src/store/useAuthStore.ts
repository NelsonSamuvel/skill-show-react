import { getSession } from "@/services/authService";
import { create } from "zustand";

export type AuthStoreType = {
    user: null | any;
    isLoading: boolean;
    updateSession: () => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    user: null,
    isLoading: true,

    updateSession: async () => {
        const { session } = await getSession();
        set({ user: session?.user ? session?.user : null, isLoading: false });
    }
}))





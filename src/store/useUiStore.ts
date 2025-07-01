import { create } from "zustand";

export type UiStateType = {
    isGlobalLoading: boolean;
    setIsGlobalLoading: (value: boolean) => void;
}

export const useUiStore = create<UiStateType>((set) => ({
    isGlobalLoading: false,
    setIsGlobalLoading: (value: boolean) => set({ isGlobalLoading: value })
}))



import { create } from "zustand";

type TriggerStore = {
  active: boolean;
  activate: () => void;
};

export const useTrigger = create<TriggerStore>((set, get) => ({
  active: false,
  activate: () => set({ active: !get().active }),
}));

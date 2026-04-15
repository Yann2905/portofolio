"use client";

import { create } from "zustand";
import type { ScreenKey } from "./types";

interface AppState {
  screen: ScreenKey;
  previousScreen: ScreenKey;
  direction: 1 | -1;
  selectedProjectId: string | null;
  setScreen: (s: ScreenKey) => void;
  selectProject: (id: string | null) => void;
}

const order: ScreenKey[] = ["home", "projects", "skills", "contact"];

export const useApp = create<AppState>((set, get) => ({
  screen: "home",
  previousScreen: "home",
  direction: 1,
  selectedProjectId: null,
  setScreen: (s) => {
    const current = get().screen;
    if (current === s) return;
    const dir: 1 | -1 =
      order.indexOf(s) > order.indexOf(current) ? 1 : -1;
    set({ screen: s, previousScreen: current, direction: dir, selectedProjectId: null });
  },
  selectProject: (id) => set({ selectedProjectId: id }),
}));

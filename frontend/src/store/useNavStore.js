// src/stores/navigationStore.js
import {create} from "zustand";

const useNavigationStore = create((set, get) => ({
  main_nav: null,  // path nav
  step_nav: null,  // stepper nav 

  setMainNav: (value) => set({ main_nav: value }),
  setStepNav: (value) => set({ step_nav: value }),
  resetNav: () => set({ main_nav: null, step_nav: null }),

  resolveMainNavFromPath: (path) => {
    if (path === "/") return "/";
    const m = path.match(/^\/([^\/]+)/);
    const val = m ? m[1] : null; // "dashboard"

    return val
  },

  setMainNavFromPath: (path) => {
    const val = get().resolveMainNavFromPath(path);
    set({ main_nav: val });
    return val;
  },
}));

export default useNavigationStore;
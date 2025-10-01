import { create  } from "zustand";


export const usePromptStore = create((set, get) => ({
    prompts: [],
    selectedPrompt : null,
    setSelectedPrompt : (selectedPrompt) => set({ selectedPrompt }),

    getPromptById: (id) => {
        const { prompts } = get();
        return prompts.find((p) => p.id === id) || null;
    },

    setPrompts: (models) => set({ models }),
    addPrompt: (model) =>
        set((state) => ({
            models: [...state.prompts, model],
        })),
    removePrompt: (id) =>
        set((state) => ({
            models: state.prompts.filter((m) => m.id !== id),
        })),

}))
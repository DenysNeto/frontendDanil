import { create  } from "zustand";


export const useModelStore = create((set, get) => ({
    models: [],
    selectedModel : null,
    setSelectedModel : (selectedModel) => set({ selectedModel }),
    resetSelectedModel: () => set({ selectedModel: null }),
    getModelById: (id) => {
        const { models } = get();
        return models.find((m) => m.id === id) || null;
    },

    setModels: (models) => set({ models }),
    addModel: (model) =>
        set((state) => ({
            models: [...state.models, model],
        })),
    removeModel: (id) =>
        set((state) => ({
            models: state.models.filter((m) => m.id !== id),
        })),
    updateModel: (id, updated) =>
        set((state) => ({
            models: state.models.map((m) =>
                m.id === id ? { ...m, ...updated } : m
            ),
        })),
}))
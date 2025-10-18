import { create } from "zustand";


const MODELS_URL = "/json/modelsList.json"

export type Model = Record<string, any>;

export interface ModelStore {
  models: Model[];
  selectedModel: Model | null;
  selectedIndex: number;
  updateModels: (url?: string) => Promise<void>;
  setSelectedIndex: (index: number) => void;
  setSelectedModel: (model: Model | null) => void;
  setModels: (models: Model[]) => void;
  getModelById: (id: string) => Model | null;
  getValues: () => { models: Model[]; selectedModel: Model | null; selectedIndex: number };
}


export const useModelStore1 = create<ModelStore>((set, get) => ({
  models: [],
  selectedModel: null,
  selectedIndex: -1,

  updateModels: async (url = MODELS_URL) => {
    set({ models: [], selectedModel: null, selectedIndex: -1 });
    try {
      console.log("HERE", url)
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Model[] = await res.json();
       
      const currentIndex = get().selectedIndex;
      const safeIndex = currentIndex >= 0 && currentIndex < data.length ? currentIndex : -1;
      set({
        models: data,
        selectedIndex: safeIndex,
        selectedModel: safeIndex !== -1 ? data[safeIndex] : null,
      });
    } catch (err: any) {
      console.error("updateModels error:", err);
    }
  },

  setSelectedIndex: (index: number) => {
    const { models } = get();
    const safeIndex = index >= 0 && index < models.length ? index : -1;
    set({
      selectedIndex: safeIndex,
      selectedModel: safeIndex !== -1 ? models[safeIndex] : null,
    });
  },

  setSelectedModel: (model: Model | null) => {
    const { models } = get();
    const idx = model ? models.findIndex((m) => m.id === model.id) : -1;
    set({ selectedModel: model, selectedIndex: idx });
  },

  setModels: (models: Model[]) => {
    const currentIndex = get().selectedIndex;
    const safeIndex = currentIndex >= 0 && currentIndex < models.length ? currentIndex : -1;
    set({
      models,
      selectedIndex: safeIndex,
      selectedModel: safeIndex !== -1 ? models[safeIndex] : null,
    });
  },

  getModelById: (id: string) => {
    const { models } = get();
    return models.find((m) => m.id === id) || null;
  },

  getValues: () => {
    const { models, selectedModel, selectedIndex } = get();
    return { models, selectedModel, selectedIndex };
  },
}));
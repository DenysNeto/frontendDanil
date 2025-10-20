import { create } from "zustand";

const MODELS_URL = "/model_data.json";

export type Model = Record<string, any>;

export interface ModelStore {
  models: Model[];
  selectedModel: Model | null;
  selectedIndex: number;
  selectedModelBenchmark: any | null;

  updateModels: (url?: string) => Promise<void>;
  setSelectedIndex: (index: number) => void;
  setSelectedModel: (model: Model | null) => void;
  setModels: (models: Model[]) => void;
  setSelectedModelBenchmark: (b: any | null) => void;

  getModelById: (id: string) => Model | null;
  getValues: () => { models: Model[]; selectedModel: Model | null; selectedIndex: number; selectedModelBenchmark: any | null };
}

function extractBenchmarkFromModel(model: Model | null) {
  if (!model) return null;

  // Попытка взять удобную структуру benchmark из популярных полей
  // Подстраивай под реальную структуру JSON
  if (Array.isArray(model.accuracy_vs_baseline) && model.accuracy_vs_baseline.length > 0) {
    return model.accuracy_vs_baseline[0];
  }
  if (model.accuracy_vs_baseline && typeof model.accuracy_vs_baseline === "object") {
    return model.accuracy_vs_baseline;
  }
  if (Array.isArray(model.benchmarks) && model.benchmarks.length > 0) {
    return model.benchmarks[0];
  }
  if (model.benchmark) return model.benchmark;

  // fallback: если есть поля похожие на id/latency/price, возвращаем частичный объект
  const candidate = {};
  if (model.id) (candidate as any).id = model.id;
  if (model.title) (candidate as any).title = model.title;
  if (model.latency_ms) (candidate as any).latency_ms = model.latency_ms;
  if (model.price) (candidate as any).price = model.price;
  if (Object.keys(candidate).length) return candidate;

  return null;
}

export const useModelStore1 = create<ModelStore>((set, get) => ({
  models: [],
  selectedModel: null,
  selectedIndex: -1,
  selectedModelBenchmark: null,

  updateModels: async (url = MODELS_URL) => {
    // Сброс состояния перед загрузкой
    set({ models: [], selectedModel: null, selectedIndex: -1, selectedModelBenchmark: null });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Model[] = await res.json();

      const currentIndex = get().selectedIndex;
      const safeIndex = currentIndex >= 0 && currentIndex < data.length ? currentIndex : -1;
      const selectedModel = safeIndex !== -1 ? data[safeIndex] : null;

      set({
        models: data,
        selectedIndex: safeIndex,
        selectedModel,
        selectedModelBenchmark: extractBenchmarkFromModel(selectedModel),
      });
    } catch (err: any) {
      console.error("updateModels error:", err);
      // оставляем предыдущие данные в сторе или уже сброшенные
    }
  },

  setSelectedIndex: (index: number) => {
    const { models } = get();
    const safeIndex = index >= 0 && index < models.length ? index : -1;
    const selectedModel = safeIndex !== -1 ? models[safeIndex] : null;
    set({
      selectedIndex: safeIndex,
      selectedModel,
      selectedModelBenchmark: extractBenchmarkFromModel(selectedModel),
    });
  },

  setSelectedModel: (model: Model | null) => {
    const { models } = get();
    const idx = model ? models.findIndex((m) => m.id === model.id) : -1;
    set({
      selectedModel: model,
      selectedIndex: idx,
      selectedModelBenchmark: extractBenchmarkFromModel(model),
    });
  },

  setModels: (models: Model[]) => {
    const currentIndex = get().selectedIndex;
    const safeIndex = currentIndex >= 0 && currentIndex < models.length ? currentIndex : -1;
    const selectedModel = safeIndex !== -1 ? models[safeIndex] : null;
    set({
      models,
      selectedIndex: safeIndex,
      selectedModel,
      selectedModelBenchmark: extractBenchmarkFromModel(selectedModel),
    });
  },

  setSelectedModelBenchmark: (b: any | null) => {
    set({ selectedModelBenchmark: b });
  },

  getModelById: (id: string) => {
    const { models } = get();
    return models.find((m) => m.id === id) || null;
  },

  getValues: () => {
    const { models, selectedModel, selectedIndex, selectedModelBenchmark } = get();
    return { models, selectedModel, selectedIndex, selectedModelBenchmark };
  },
}));
import { create  } from "zustand";


export const useTaskStore = create((set, get) => ({
    tasks: [],
    selectedTask : null, // benchmark or prompt comparison
    optimizationTypes : [],
    selectedOptimizationType : null,
    setTasks : (tasks) => set({ tasks }),
    setSelectedTask : (selectedTask) => set({ selectedTask }),
    resetSelectedTask: () => set({ selectedTask: null }),
    setSelectedOptimizationTypes : (optimizationTypes) => set({ optimizationTypes }),
    setSelectedOptimizationType : (selectedOptimizationType) => set({ selectedOptimizationType }),
    resetSelectedOptimizationType: () => set({ selectedOptimizationType: null }),

}))
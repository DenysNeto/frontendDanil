import { create } from "zustand";

const genId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
const DEFAULT_JSON_URL = "/json/benchmarkList.json";

export const useBenchmarkStore1 = create((set, get) => ({
  rawText: "",
  parsed: null,
  valid: false,
  error: null,
  benchmarks: [], // ✅ добавляем benchmarks

  setRawText: (text) => set({ rawText: text, valid: false, error: null }),

  parse: (text = null) => {
    const toParse = text !== null ? text : get().rawText;
    if (!toParse || !toParse.trim()) {
      set({ parsed: null, valid: false, error: "Empty input", benchmarks: [] });
      return { ok: false, error: "Empty input" };
    }

    try {
      const parsed = JSON.parse(toParse);
      const benchmarks = Array.isArray(parsed) ? parsed : [parsed];
      set({ parsed, valid: true, error: null, rawText: toParse, benchmarks });
      return { ok: true, parsed };
    } catch (e) {
      set({ parsed: null, valid: false, error: e.message, benchmarks: [] });
      return { ok: false, error: e.message };
    }
  },

  format: () => {
    const { parsed, rawText } = get();
    if (parsed !== null) {
      const pretty = JSON.stringify(parsed, null, 2);
      set({ rawText: pretty });
      return { ok: true, text: pretty };
    }

    const res = get().parse(rawText);
    if (!res.ok) return res;
    const pretty = JSON.stringify(res.parsed, null, 2);
    set({ rawText: pretty, parsed: res.parsed, valid: true, error: null });
    return { ok: true, text: pretty };
  },

  clear: () => set({ rawText: "", parsed: null, valid: false, error: null, benchmarks: [] }),

  loadFromUrl: async (url = DEFAULT_JSON_URL) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      const rawText = JSON.stringify(data, null, 2);
      const benchmarks = Array.isArray(data) ? data : [data];
      console.log("BENCHMARK", benchmarks)
      set({ rawText, parsed: data, valid: true, error: null, benchmarks });

      return { ok: true, parsed: data };

    } catch (e) {
      set({ rawText: "", parsed: null, valid: false, error: e.message, benchmarks: [] });
     
      return { ok: false, error: e.message };
    }
  },
}));
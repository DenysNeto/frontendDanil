import { create } from "zustand";

const genId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

/**
 * useBenchmarkStore
 * A small, focused store for the benchmark input flow.
 * - rawText: the editor/raw JSON text
 * - parsed: parsed JS value (object or array) or null
 * - valid: boolean validation flag
 * - error: parsing error message
 *
 * Provides helpers to parse/validate/format and to normalize parsed data into prompts
 * that can then be imported into your prompt store.
 */
export const useBenchmarkStore = create((set, get) => ({
    rawText: "",
    parsed: null,
    valid: false,
    error: null,

    setRawText: (text) => set({ rawText: text, valid: false, error: null }),

    // parse rawText and update parsed/valid/error
    parse: (text = null) => {
        const toParse = text !== null ? text : get().rawText;
        if (!toParse || !toParse.trim()) {
            set({ parsed: null, valid: false, error: 'Empty input' });
            return { ok: false, error: 'Empty input' };
        }

        try {
            const parsed = JSON.parse(toParse);
            set({ parsed, valid: true, error: null, rawText: toParse });
            return { ok: true, parsed };
        } catch (e) {
            set({ parsed: null, valid: false, error: e.message });
            return { ok: false, error: e.message };
        }
    },

    // format current parsed (or attempt to parse and format) and update rawText
    format: () => {
        const { parsed, rawText } = get();
        if (parsed !== null) {
            const pretty = JSON.stringify(parsed, null, 2);
            set({ rawText: pretty });
            return { ok: true, text: pretty };
        }

        // try to parse from rawText
        const res = get().parse(rawText);
        if (!res.ok) return res;
        const pretty = JSON.stringify(res.parsed, null, 2);
        set({ rawText: pretty, parsed: res.parsed, valid: true, error: null });
        return { ok: true, text: pretty };
    },

    clear: () => set({ rawText: '', parsed: null, valid: false, error: null }),
}));

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import Template from "../components/UI/Template.jsx";
import ComparisonContainer from "../components/Compare/ComparisonContainer.jsx";
import PromptInput from "../components/UI/PromptInput.jsx";
import useInferenceAPI from "../hooks/useInferenceAPI.js";
import { useModelStore1 } from "../store/useModelStore1.js";
import ModelsSelectReminder from "../components/Models/ModelSelectReminder.jsx"
// Move function outside component to prevent recreation
function transformForCompare(input){
  if (!input) return {};

  const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const unitPat=/_(ms|tps|%|s|sec|kb|mb|gb|ops|rps|qps)$/i;
  const norm=k=>k.replace(/_vs_.*|_(list|array|items)|_(ms|tps|%|s|sec|kb|mb|gb|ops|rps|qps)$/i,'').replace(/[^a-z0-9_]/ig,'').toLowerCase();
  const raw={};
  Object.keys(input).forEach(k=>{
    if(['id','title','price'].includes(k)) return;
    const v=input[k];
    if(isObj(v)){
      const n=norm(k); raw[n]=raw[n]||{unit:null,vals:{}}; if(k.match(unitPat)) raw[n].unit=(k.match(unitPat)[1].toLowerCase());
      Object.keys(v).forEach(s=>{ const x=v[s]; if(typeof x!=='object') raw[n].vals[s]=x; else Object.keys(x).forEach(s2=>raw[n].vals[s2]=x[s2]); });
    } else if(Array.isArray(v)&&isObj(v[0])){
      const n=norm(k); raw[n]=raw[n]||{unit:null,vals:{}}; v.forEach(it=>Object.keys(it).forEach(s=>raw[n].vals[s]=it[s])); if(n.includes('accuracy')&&!raw[n].unit) raw[n].unit='%';
    }
  });
  Object.keys(input).forEach(k=>{ if(k==='compareFields'&&isObj(input[k])) Object.keys(input[k]).forEach(m=>{ const e=input[k][m]; const n=norm(m); raw[n]=raw[n]||{unit:null,vals:{}}; if(e.unit) raw[n].unit=e.unit; Object.keys(e).forEach(s=>{ if(s!=='unit') raw[n].vals[s]=e[s]; }); }); });
  const counts={}; Object.keys(raw).forEach(m=>Object.keys(raw[m].vals).forEach(t=>counts[t]=(counts[t]||0)+1));
  let types=Object.entries(counts).filter(([t,c])=>c>=2).map(([t])=>t); if(types.length===0) types=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([t])=>t);
  const pref=['optimized','baseline']; types.sort((a,b)=>{const ai=pref.findIndex(p=>a.startsWith(p));const bi=pref.findIndex(p=>b.startsWith(p)); if(ai===-1&&bi===-1) return a.localeCompare(b); if(ai===-1) return 1; if(bi===-1) return -1; return ai-bi;});
  const compareFields={}; Object.keys(raw).forEach(m=>{ const e=raw[m]; if(types.some(t=>t in e.vals)){ compareFields[m]={}; types.forEach(t=>compareFields[m][t]=t in e.vals?e.vals[t]:null); compareFields[m].unit=e.unit||null; }});
  return { id: input.id||null, title: input.title||null, price: input.price||null, compareFields, compareTypes: types };
}

// Memoize the store selector to prevent unnecessary re-renders
const useSelectedBenchmark = () => {
  return useModelStore1((s) => s.selectedModelBenchmark);
};

export default function ModelPromptPage() {
  const navigate = useNavigate();
  const selectedModelBenchmark = useSelectedBenchmark();

  // Debug: Log when component re-renders (only when benchmark changes)
  const benchmarkId = selectedModelBenchmark?.id;
  console.log("🔄 ModelPromptPage re-render, benchmark:", benchmarkId || 'none');

  // Use hooks directly, not in useState
  const optimizedAPI = useInferenceAPI("http://localhost:8000/api/v1");
  const baselineAPI = useInferenceAPI("http://localhost:8000/api/v1");

  // Memoize the transformed data to prevent unnecessary recalculations
  const compareData = useMemo(() => {
    console.log("🔄 Computing compareData for benchmark:", selectedModelBenchmark?.id);
    const result = selectedModelBenchmark ? transformForCompare(selectedModelBenchmark) : {};
    console.log("📊 compareData result:", result);
    return result;
  }, [selectedModelBenchmark]);

  // Check if we have benchmark data
  const hasBenchmarkData = selectedModelBenchmark && Object.keys(compareData).length > 0;

  const [responsePrompt, setResponsePrompt] = useState(false);
  const promptChat = useRef(null);

  // Memoize scroll function to prevent recreation
  const scrollToBottom = useCallback(() => {
    if (promptChat.current) {
      promptChat.current.scrollTo({
        top: promptChat.current.scrollHeight,
        behavior: "smooth", // плавная прокрутка
      });
    }
  }, []);

  // Memoize sendPrompt function to prevent recreation
  const sendPrompt = useCallback((val) => {
    if (!val.trim()) return;
    console.log("🎯 Sending prompt:", val);
    optimizedAPI.sendPrompt(val);
    baselineAPI.sendPrompt(val);
    setResponsePrompt(true);
  }, [optimizedAPI, baselineAPI]);

  // Scroll to bottom when responses update - use more stable dependencies
  useEffect(() => {
    if (responsePrompt && (optimizedAPI.response || baselineAPI.response)) {
      console.log("✅ Optimized response:", optimizedAPI.response);
      console.log("✅ Baseline response:", baselineAPI.response);
      scrollToBottom();
    }
  }, [optimizedAPI.response, baselineAPI.response, responsePrompt, scrollToBottom]);

  // Memoize the response data to prevent recreation of objects passed to components
  const responseData = useMemo(() => {
    if (!responsePrompt || !optimizedAPI.response || !baselineAPI.response) return null;

    return {
      compareFields: {
        "Live Data": {
          "optimized": optimizedAPI.response,
          "baseline": baselineAPI.response
        }
      },
      compareTypes: ["optimized", "baseline"]
    };
  }, [optimizedAPI.response, baselineAPI.response, responsePrompt]);


return (
  <div className="text-black h-full">
    <Template type="action">
      <ViewTitle  title="Model Demo" titleSize="6" align="left" backButton={true} />


      <ViewContent> 
        <div className="flex flex-col max-h-[65vh]">

          <div ref={promptChat} className=" flex-1 overflow-y-auto px-4 py-2">
            {hasBenchmarkData ? (
              <>
                <ComparisonContainer data={compareData} />
                <div className="mb-20" />

                {responseData && (
                    <ComparisonContainer
                      data={responseData}
                      header={true}
                      isPrompt="true"
                    />
                  )}
              </>
            ) : <ModelsSelectReminder/>}

            <div className="mb-6" />
          </div>

          {hasBenchmarkData && (
            <div className="py-4 px-4 flex justify-end pl-[230px]">
              <PromptInput onSend={sendPrompt} />
            </div>
          )}
        </div>
      </ViewContent>
    </Template>
  </div>
);
}
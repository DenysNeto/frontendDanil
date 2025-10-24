import React, { useState, useEffect, useRef,useMemo } from "react";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import Template from "../components/ui/Template.jsx";
import ComparisonContainer from "../components/Compare/ComparisonContainer.jsx";
import PromptInput from "../components/UI/PromptInput.jsx";
import useInferenceAPI from "../hooks/useInferenceAPI.js";
import { useModelStore1 } from "../store/useModelStore1.js";

function transformForCompare(input){
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

export default function ModelPromptPage() {
  const selectedModelBenchmark = useModelStore1((s) => s.selectedModelBenchmark);
  
  console.log("SELECTED_BENCHMARK", selectedModelBenchmark)

  const [compareData,setCompareData] = useState({})
  const [optimizedAPI , setOptimizedAPI] = useState( useInferenceAPI("http://localhost:8000/api/v1")) 
  const [baselineAPI , setBaselineAPI] = useState( useInferenceAPI("http://localhost:8000/api/v1")) 


  useEffect(() => {
      setCompareData(transformForCompare(selectedModelBenchmark)) 
  }, []);

  const [responsePrompt, setResponsePrompt] = useState(false);
  
  const promptChat = useRef(null) 

const isValidResponse = (res) => res && typeof res === "object" && !Array.isArray(res);
  function scrollToBottom() {
    if (promptChat.current) {
      promptChat.current.scrollTo({
        top: promptChat.current.scrollHeight,
        behavior: "smooth", // плавная прокрутка
      });
    }
  }

  function sendPrompt(val) {
    if (!val.trim()) return;
    optimizedAPI.sendPrompt(val);
    baselineAPI.sendPrompt(val);
    setResponsePrompt(true);
  }

  useEffect(() => {
    if (responsePrompt) {
      console.log("✅ Optimized response:", optimizedAPI.response);
      console.log("✅ Baseline response:", baselineAPI.response);
      scrollToBottom();
    }
  }, [optimizedAPI.response, baselineAPI.response]);


return (
  <div className="bg-white text-black h-[70vh]">
    <Template type="action">
      <ViewTitle title="Model Demo" align="left" />

      {/* Ограничиваем высоту только здесь */}
      <ViewContent className="h-[50vh]"> {/* ← подставь нужную высоту ViewTitle */}
        <div className="flex flex-col">

          {/* Прокручиваемый блок */}
          <div ref={promptChat} className="flex-1 overflow-y-auto px-4 py-2">
             <ComparisonContainer data={compareData} />
            <div className="mb-20" />
           
           
            {/* {responsePrompt &&
              isValidResponse(optimizedAPI) &&
              isValidResponse(baselineAPI) && (
                <ComparisonContainer
                  data={
                    {compareFields:{"LiveData": {"optimized":optimizedAPI.response , baseline:  baselineAPI.response}}}
                  }
                  header={true}
                />
              )} */}


            <div className="mb-6" />
          </div>
          
          <div className="shrink-0 sticky bottom-0 bg-white py-4 px-4 w-4/5 ml-auto">
            <PromptInput onSend={sendPrompt} />
          </div>
        </div>
      </ViewContent>
    </Template>
  </div>
);
}
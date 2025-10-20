import React, { useState } from "react";
import NavSide from "../components/UI/NavSide.jsx";
import ViewTitle from "../components/UI/ViewTitle.jsx";
import ViewContent from "../components/UI/ViewContent.jsx";
import AppHeader from "../components/UI/AppHeader.jsx";

import Template from "../components/UI/Template.jsx";
;
import ComparisonContainer from "../components/Compare/ComparisonContainer.jsx"
import PromptInput from "../components/UI/PromptInput.jsx";
import AppFooter from "../components/UI/AppFooter.jsx";
import BgImgPaste from "../components/UI/BgImgPaste.jsx";

import { useModelStore1 } from "../store/useModelStore1.js";




let TestForPromptData = {
    "live data" : ["ABC","deg"]
}


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
  const selectedModelBenchmark = useModelStore1((s)=>s.selectedModelBenchmark)
  const templateType = 'action';


  const compareData = transformForCompare(selectedModelBenchmark)
  const [responsePrompt, setResponsePrompt] = useState(false);


  function sendPrompt(val){
     setResponsePrompt(true) 
  }

  return (
    <div className={`min-h-screen bg-white text-black`}>
        <AppHeader />
         <NavSide typeNav="horizontal" />
        <Template  type={templateType}>
           
        <ViewTitle title={"Model Demo"} align="left" />
 
        <ViewContent>
      
        <div className="min-h-[70vh] flex flex-col justify-between ">
          <div className="min-h-[50vh] max-h-[50vh] overflow-y-auto ">
            <ComparisonContainer  data={compareData} />
     
            <div className="mb-18"></div>
            {responsePrompt && <ComparisonContainer data={TestForPromptData} header={false} />
            }
            
          
          </div>
          

          <div className="mb-4" />

          <div className="sticky bottom-0 min-h-[20vh] max-h-[20vh] w-4/5 ml-auto ">
            <PromptInput onSend={sendPrompt} />
          </div>
        </div>
    </ViewContent>
          
        </Template>
     
           <BgImgPaste position={"bot"} />
    </div>


  );
}
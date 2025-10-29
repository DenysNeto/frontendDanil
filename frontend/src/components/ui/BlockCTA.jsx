import { funky } from "react-syntax-highlighter/dist/esm/styles/prism";
import ViewContent from "./ViewContent";
import ViewTitle from "./ViewTitle";



export default function BlockCTA(){
    return(
        <>
        


            <div className={"bg-[#303030]  relative text-white rounded-3xl p-10 min-h-[300px] flex justify-between overflow-hidden " } >
                <ViewTitle titleSize={6} title={"Start building today"} subtitle={"Instantly run popular and specialized models."} subtitleSize={2} align={"left"} actionText="GET STARTED"  actionVariant={'outlined'} />

                <img src="/bg/cta1.svg" className="bg-[#303030] max-w-[30vw] absolute right-0 bottom-[0%] h-full " />


              </div>
        </>
    )
}
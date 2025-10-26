import { funky } from "react-syntax-highlighter/dist/esm/styles/prism";
import ViewContent from "./ViewContent";
import ViewTitle from "./ViewTitle";



export default function BlockCTA(){
    return(
        <>
            <div className="bg-[#303030] text-white rounded-3xl p-6">
                <ViewTitle title={"Start building today"} subtitle={"Instantly run popular and specialized models."} align={"left"} actionText="GET STARTED"  actionVariant={'outlined'} />
            </div>
        </>
    )
}
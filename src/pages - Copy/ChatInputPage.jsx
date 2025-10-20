import React from 'react';
import Chat from '../components/prompt/PromptChat.jsx';
import Header from "../components/ui/Header.jsx";
import Divider from '../components/ui/Divider.jsx';
import {Button} from "../components/ui/Button.jsx";
import {ChevronRight ,  ChevronLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";


export default function ChatInputPage() {
    const descrition = "Chat with the model and evaluate its responses.";
    const navigate = useNavigate();
    
    const handleBackClick = ()=>{
      navigate("/comparison_type")
    }

  return (
       <>
         <div className="p-6">
                <div className="w-full flex justify-between">
                    <div className="flex-2/3">
                        
            
                        <Header
                            className="pb-4"
                            title="Prompt Chat"
                            description={descrition}
                        />
                <div className="flex-1/3 flex justify-start items-end h-30">
                        {  <div>
                            <Button variant="success"  onClick={handleBackClick} icon={<ChevronLeft />}>Back</Button>
                        </div>
                        }
                </div>
                    </div>
                </div>
                <Divider/>


                <Chat />

              </div>
          </>
  );
}
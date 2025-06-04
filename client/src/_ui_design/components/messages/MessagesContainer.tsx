import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
    return (
   
            <div className="w-full flex flex-col">
                <Messages/>
              <MessageInput/>
            </div>
       
    )
};

export default MessageContainer;
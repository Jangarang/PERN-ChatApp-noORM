import MessageContainer from "../_ui_design/components/messages/MessagesContainer";
import Sidebar from "../_ui_design/components/sidebar/Sidebar";

const Home = () => {

    return (
        <div className='flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            {/* <p className="text-red-500">Hello</p> */}
            <Sidebar/>
            <MessageContainer/>
        </div>
    )    

};

export default Home;
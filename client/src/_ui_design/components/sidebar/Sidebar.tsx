import SearchInput from "./SearchInput";
import LogoutButton from "./Logout";
const Sidebar = () => {
    return (
        <aside className='border-r border-slate-500 p-1 md:p-4 flex flex-col w-44 md:w-1/2'>
            <SearchInput/>
            <p>Hello</p>
            <LogoutButton/>

        </aside>
    )
};

export default Sidebar;
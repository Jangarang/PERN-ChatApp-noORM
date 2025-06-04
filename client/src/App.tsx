import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import type { RootState } from "./store/authStore";

function App() {

  const authUser = useSelector((state: RootState) => state.auth.authUser);


  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        {/* { !authUser ? (<Navigate to={"/login"}/>) : (<Route path="/" element={<Home/>}/>)} */}
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={<SignUp/>}/>
        /* <Route path="/login" element={<Login/>}/> 
      </Routes> 
    </div>
  )
}

export default App

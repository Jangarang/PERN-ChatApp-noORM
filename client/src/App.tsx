import { Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home/>}/>              
        {/* <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/> */}
      </Routes> 
    </div>
  )
}

export default App

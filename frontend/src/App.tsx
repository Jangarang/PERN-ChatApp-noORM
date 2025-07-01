import { createBrowserRouter, 
  // Navigate, 
  //Route,
  RouterProvider, 
  //Routes 
} from "react-router";
//import { useSelector } from 'react-redux';
//import type { RootState } from "./store";
//import RootLayout from "./pages/Root";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>
      <Home/>
    </ProtectedRoute>,
    id: 'root', 
  },
  {
    path:"/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


function App() {

  // const authUser = useSelector((state: RootState) => state.auth.authUser);


  return <RouterProvider router={router}/>
  // <div className="p-4 h-screen flex items-center justify-center">
  //     <Routes>
  //       {/* { !authUser ? (<Navigate to={"/login"}/>) : (<Route path="/" element={<Home/>}/>)} */}
  //       <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
  //       <Route path="/signup" element={<SignUp/>}/>
  //       /* <Route path="/login" element={<Login/>}/> 
  //     </Routes> 
  //   </div>
  //   )
}

export default App

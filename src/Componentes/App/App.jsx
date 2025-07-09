import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MasterLayOut from './../LayOutComp/MaterLayOut/MasterLayOut';
import NotFound from './../RegisterationComp/NotFound/NotFound';
import Home from './../LayOutComp/HomePage/Home';
import Login from './../RegisterationComp/Login/Login';
import SignUp from './../RegisterationComp/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import MedicalTourism from '../LayOutComp/medicaltourism/medicaltourism';
export default function App() {
 
  let   routes=createBrowserRouter([
    {path:'/',element:<MasterLayOut/>, errorElement:<NotFound/>,children:([
      {index:true,element:  <Home/>  },
      {path:'medicaltourism', element: <MedicalTourism /> },
      {path:'Login',element: <Login/> },
      {path:'SignUp',element: <SignUp/>}

    ])}
  ])
  
  return (
    <>
       <RouterProvider router={routes}/>
      {/* <Home/> */}
    </>
  )
}

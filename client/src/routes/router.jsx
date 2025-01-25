import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoutes";
import Profile from "../pages/Profile";
import AllBioData from "../pages/AllBioData";
import CheckOut from "../pages/CheckOut";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import UpdateBioData from "../pages/UpdateBioData";
import AllSuccessStories from "../pages/AllSuccessStories";
import AddMyBioData from "../pages/User/AddMyBioData";
import MyBioData from "../pages/User/MyBioData";
import MyFavorites from "../pages/User/MyFavorites";
import MyContactReq from "../pages/User/MyContactReq";
import GotMarried from "../pages/User/GotMarried";
import AdminDashboard from "../layouts/AdminDashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import ApprovedPremium from "../pages/Admin/ApprovedPremium";
import ApprovedContactRequest from "../pages/Admin/ApprovedContactRequest";
import Dashboard from "../pages/Admin/Dashboard";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
         {
            path: '/addMyBioData/:email',
            element: <PrivateRoute><AddMyBioData></AddMyBioData></PrivateRoute>
         },
         {
            path: '/updateBioData/:email',
            element: <PrivateRoute><UpdateBioData></UpdateBioData></PrivateRoute>
         },
         {
            path: '/myBioData/:email',
            element: <PrivateRoute><MyBioData></MyBioData></PrivateRoute>
         },
         {
            path: '/myFavorites/:email',
            element: <PrivateRoute><MyFavorites></MyFavorites></PrivateRoute>
         },
         {
            path: '/myContactReq/:email',
            element: <PrivateRoute><MyContactReq></MyContactReq></PrivateRoute>
         },
         {
            path: '/gotMarried/:email',
            element: <PrivateRoute><GotMarried></GotMarried></PrivateRoute>
         },
         {
            path: '/bioData',
            element: <PrivateRoute><AllBioData></AllBioData></PrivateRoute>
         },
         {
            path: '/allSuccessStories',
            element:<AllSuccessStories></AllSuccessStories>
         },
         {
            path: '/aboutUs',
            element: <AboutUs></AboutUs>
         },
         {
            path: '/contactUs',
            element: <ContactUs></ContactUs>
         },
         {
            path: '/profile/:id',
            element: <PrivateRoute><Profile></Profile></PrivateRoute>
         },
         {
            path: '/checkout/:id',
            element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
         },
      ]
   },
   {
      path:"/admin",
      element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
      children: [
         {
            path:'/admin/dashboard',
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
         },
         {
            path:'/admin/manageUsers',
            element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
         },
         {
            path:'/admin/approvedPremium',
            element: <PrivateRoute><ApprovedPremium></ApprovedPremium></PrivateRoute>
         },
         {
            path:'/admin/approvedContactRequest',
            element: <PrivateRoute><ApprovedContactRequest></ApprovedContactRequest></PrivateRoute>
         },
      ]
   },
   {
      path: "/login",
      element: <LogIn></LogIn>
   }, ,
   {
      path: "/register",
      element: <Register></Register>
   }
]);
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import AHeader from "./components/AHeader";
import AFooter from "./components/AFooter";

const Admin = () => 
{
  return (
    <>
      <AHeader></AHeader>
      <SideBar></SideBar>
      <Outlet></Outlet>
      <AFooter></AFooter>
    </>
  )
}

export default Admin;
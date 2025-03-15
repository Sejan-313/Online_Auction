import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import AHeader from "./components/AHeader";
import AFooter from "./components/AFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => 
{
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "admin") {
          navigate("/login");
      }
  }, [navigate]);

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
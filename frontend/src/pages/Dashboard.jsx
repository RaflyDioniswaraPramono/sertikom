import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { LoadingSpin, Navbar, Sidebar } from "../components";

const Dashboard = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/surat");
  }, [navigate]);

  return (
    <div className="grid grid-cols-10 overflow-hidden">
      <div className="col-span-2 pl-4 py-4">
        <Sidebar />
      </div>
      <div className="col-span-8 grid grid-rows-8 h-screen">
        <div className="row-span-1 p-4">
          <Navbar />
        </div>
        <div className="row-span-7 pl-4">
          {navigation.state === "loading" && <LoadingSpin />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

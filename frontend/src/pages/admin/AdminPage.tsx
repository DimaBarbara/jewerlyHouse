import { Outlet } from "react-router-dom";
import Bar from "../../components/admin/Bar";
import Layout from "../../components/admin/Layout";

const AdminPage = () => {
  return (
    <div className="flex">
      <Bar />
      <div className="flex flex-col flex-1">
        <div className="">
          <Layout />
        </div>
        <div className="flex-1 flex  items-start p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

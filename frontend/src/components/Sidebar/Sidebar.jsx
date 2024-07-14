import { NavLink } from "react-router-dom";
import { sidebarContents } from "../../contents/sidebar-contents";
import { ProductOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center gap-2 items-center p-4 bg-[#232932] rounded-t-lg shadow-md">
        <ProductOutlined className="text-zinc-400 text-2xl" />
        <p className="text-sm font-bold tracking-wide text-center text-zinc-400">SERTIKOM BNSP DIPA 2024</p>
      </div>
      <div className="bg-white p-4 h-full rounded-b-lg shadow-md">
        <p className="mt-3 text-xs tracking-wider font-medium mb-2 text-zinc-400">MENU</p>
        {sidebarContents.map((links) => {
          const { id, to, linkName, icon } = links;

          return (
            <NavLink
              key={id}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "flex justify-start items-center gap-2 p-3 bg-zinc-200 text-black rounded-lg mb-1"
                  : "flex justify-start items-center gap-2 p-3 bg-white hover:bg-zinc-200 rounded-lg transition-colors duration-150 mb-1"
              }>
              {icon}
              <p className="text-sm">{linkName}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

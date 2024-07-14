import { ProductOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="flex justify-center gap-2 items-center bg-white p-4 rounded-lg shadow-md">
      <ProductOutlined className="text-zinc-500 text-2xl"/>
      <p className="text-md font-bold tracking-wide text-center text-zinc-500">SERTIKOM BNSP DIPA 2024</p>
    </div>
  )
};

export default Navbar;

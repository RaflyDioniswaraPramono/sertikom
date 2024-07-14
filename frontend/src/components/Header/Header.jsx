import PropTypes from "prop-types";
import { pointIcon } from "../../assets";

const Header = ({ title, description }) => {
  return (
    <div className="py-3 px-5 bg-white rounded-md shadow-md">
      <div className="flex justify-start items-center gap-2 mb-1">
        <img src={pointIcon} alt="Point Icon" width={24} height={24} />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  );
};

Header.propTypes = {
  description: PropTypes.any,
  title: PropTypes.any,
};

export default Header;

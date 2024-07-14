import PropTypes from "prop-types";
import { pointIcon } from "../../assets";
import { NavLink } from "react-router-dom";

const Subheader = ({ title, prevTitleTo, nextTitle, nextTitleTo, description }) => {
  return (
    <div className="py-3 px-5 bg-white rounded-md shadow-md">
      <div className="flex justify-start items-center gap-6">
        <NavLink to={prevTitleTo} className="hover:text-xl hover:text-black hover:font-semibold hover:underline transition-all duration-150 flex justify-start items-center gap-2 mb-1 text-lg font-medium text-zinc-500">
          <img src={pointIcon} alt="Point Icon" width={24} height={24} />
          {title}
        </NavLink>        
        <NavLink to={nextTitleTo} className="hover:underline transition-all duration-150 flex justify-start items-center gap-2 mb-1 text-xl font-semibold">
          <img src={pointIcon} alt="Point Icon" width={24} height={24} />
          <h1 className="">{nextTitle}</h1>
        </NavLink>
      </div>
      <p className="text-sm text-zinc-600">{description}</p>
    </div>
  );
};

Subheader.propTypes = {
  description: PropTypes.any,
  nextTitle: PropTypes.any,
  nextTitleTo: PropTypes.any,
  prevTitleTo: PropTypes.any,
  title: PropTypes.any
}

export default Subheader;

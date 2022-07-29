import { NavLink, useLocation } from "react-router-dom";

import "./Breadcrumbs.scss";

const Breadcrumbs = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className="breadcrumbs">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `breadcrumb ${isActive ? "breadcrumb-active" : ""}`
        }
      >
        Home
      </NavLink>
      <span className="breadcrumb-divider">{">"}</span>
      <NavLink
        to={pathname}
        className={({ isActive }) =>
          `breadcrumb ${isActive ? "breadcrumb-active" : ""}`
        }
      >
        {pathname.replaceAll("/", "").replaceAll("-", " ")}
      </NavLink>
    </div>
  );
};

export default Breadcrumbs;

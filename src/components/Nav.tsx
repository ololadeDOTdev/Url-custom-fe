import React from "react";
import { FaBars } from "react-icons/fa6";
import { links } from "../composables/data";
import { Link } from "react-router-dom";
import { useIsLoggedIn } from "../hooks";
interface NavProps {
  onSidebarOpen: () => void;
  sidebarOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ onSidebarOpen, sidebarOpen }) => {
  // const user = useUser();
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);
  const logout = async () => {
    // try {
    //   const auth = getAuth();
    //   await signOut(auth);
    // } catch (error) {
    //   console.error("Error signing out:", error);
    // }
  };

  const linksToShow = React.useMemo(() => {
    const _links = [...links];
    if (!isLoggedIn) _links.shift();

    return _links;
  }, [isLoggedIn]);

  return (
    <nav className="home" id="home">
      <div className="nav-center">
        <div className="logo">
          <img className="logo-icon" src="./images/Logo.svg" alt="nav-logo" />
        </div>

        <ul className="nav-links">
          {linksToShow.map((link, id) => (
            <li key={id}>
              <Link
                className={`nav-link ${id === 0 ? "primary-blue-300" : ""} `}
                to={`/${link.href}`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {sidebarOpen && isLoggedIn && (
          <ul className="signin-links">
            <li>
              <button onClick={logout} className="signin-link-bg btn-blue btn">
                Logout
              </button>
            </li>
          </ul>
        )}

        {!isLoggedIn && !sidebarOpen && (
          <ul className="signin-links">
            <li>
              <Link to="/login" className="signin-link primary-blue-300">
                Log in
              </Link>
            </li>
            <li>
              <a className="signin-link-bg btn-blue btn" href="#form">
                Try for free
              </a>
            </li>
          </ul>
        )}

        {!sidebarOpen && (
          <span className="logo-btn sidebar-open-btn" onClick={onSidebarOpen}>
            <FaBars fontSize={24} color="#095cec" />
          </span>
        )}
      </div>
    </nav>
  );
};

export default Nav;

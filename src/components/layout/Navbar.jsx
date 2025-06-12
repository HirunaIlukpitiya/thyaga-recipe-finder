import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const location = useLocation();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const toggleSidebar = () => {
    setIsSideBar(!isSideBar);
  };

  return (
    <nav className="">
      <ul className="hidden md:flex md:items-center md:gap-6 ">
        <li>
          <Link
            to={"/"}
            className={`font-semibold text-gray-600 ${
              location.pathname == "/" ? "text-primary-dark" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={`font-semibold text-gray-600 ${
              location.pathname.includes("favorites")
                ? "text-primary-dark"
                : ""
            }`}
          >
            Favorites
          </Link>
        </li>
      </ul>
      <div className="md:hidden">
        <FeatherIcon
          icon="menu"
          className=" hover:cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      {isSideBar && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={toggleSidebar}
          >
            <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20 p-4">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                <FeatherIcon icon="x" size={24} />
              </button>
              <ul className="flex flex-col gap-4 mt-8">
                <li>
                  <Link
                    to="/"
                    className="text-gray-800 hover:text-primary flex items-center gap-3"
                  >
                    <FeatherIcon icon="home" className="text-primary-light" />
                    <span
                      className={`font-semibold text-gray-600 ${
                        location.pathname == "/" ? "text-primary-light" : ""
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="text-gray-800 hover:text-primary flex items-center gap-3"
                  >
                    <FeatherIcon icon="heart" className="text-primary-light" />
                    <span
                      className={`font-semibold text-gray-600 ${
                        location.pathname.includes("favorites")
                          ? "text-primary-light"
                          : ""
                      }`}
                    >
                      Favorites
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Profile from "./Profile";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const avatarURL = user?.avatar
    ? `http://localhost:5000/uploads/${user.avatar}`
    : "/defaultImg.png";

  // Close mobile menu when clicking anywhere outside or on a nav link
  // and optionally for accessibility enhancement you can add this behavior

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="shadow-sm sticky top-0 z-50 bg-white px-4 sm:px-8 py-4"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-bold tracking-wide text-orange-500"
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Wirlo
          </Link>
        </motion.div>

        {/* Hamburger Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`
            flex-col sm:flex-row flex gap-6 text-sm font-medium
            sm:items-center sm:flex
            absolute sm:static bg-white sm:bg-transparent left-0 top-full sm:top-auto w-full sm:w-auto
            sm:transition-none transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? "flex" : "hidden"}
            shadow-lg sm:shadow-none
            p-4 sm:p-0
            sm:gap-6
          `}
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-900"
                }`
              }
            >
              Home
            </NavLink>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `block transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-900"
                }`
              }
            >
              Blogs
            </NavLink>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-900"
                }`
              }
            >
              About
            </NavLink>
          </motion.li>

          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block transition-colors duration-200 ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-900"
                }`
              }
            >
              Contact
            </NavLink>
          </motion.li>

          {user?.role === "author" && (
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to="/author-dashboard"
                className={({ isActive }) =>
                  `block transition-colors duration-200 ${
                    isActive ? "text-orange-500 font-semibold" : "text-gray-900"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </motion.li>
          )}

          {user && (
            <li className="sm:hidden border-t border-gray-200 pt-3 mt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-2 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </li>
          )}

          {!user && (
            <li className="sm:hidden border-t border-gray-200 pt-3 mt-3 flex flex-col gap-2">
              <Link to="/login">
                <button className="block w-full text-left px-2 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-md">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="block w-full text-left px-2 py-2 text-black border border-gray-200 hover:bg-gray-50 rounded-md">
                  Signup
                </button>
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden sm:flex items-center gap-3 relative">
          {user ? (
            <>
              <h2 className="text-sm font-medium text-gray-800">
                {user?.fullName}
              </h2>
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                tabIndex={0}
                onBlur={() => setDropdownOpen(false)}
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <img
                  src={avatarURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 w-40 bg-white rounded-lg shadow-lg py-2 z-50 border-[1px] border-gray-50 text-sm">
                    <button
                      onClick={() => setShowProfile(true)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="py-2 px-4 text-sm text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 ease-in rounded-full">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="py-2 px-4 text-sm text-black border border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in rounded-full">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </motion.nav>
  );
};

export default Navbar;

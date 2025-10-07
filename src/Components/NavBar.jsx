import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import logo from '../assets/logo.png';

const NavBar = () => {
  const baseClasses =
    'hover:text-[#8453e9] transition-colors duration-300 relative pb-1';
  const activeClasses =
    'text-[#8453e9] underline decoration-[#8453e9] decoration-2 underline-offset-4';

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : 'hover:underline'}`
          }
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apps"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : 'hover:underline'}`
          }
        >
          Apps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/installation"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? activeClasses : 'hover:underline'}`
          }
        >
          Installation
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 bg-base-100 shadow-sm z-50">
      <div className="navbar max-w-6xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <img
              className="w-[40px] h-[40px] object-contain"
              src={logo}
              alt="HERO.IO"
            />
            <Link to="/" className="text-[#8453E9] font-bold text-xl">
              HERO.IO
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 text-lg font-semibold">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          <a
            href="আপনার-github-লিঙ্ক"
            className="btn bg-gradient-to-r from-purple-700 to-purple-500 text-white border-none hover:from-purple-800 hover:to-purple-600 transition-all duration-300"
          >
            <FaGithub className="mr-2 text-xl" />
            Contribute
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

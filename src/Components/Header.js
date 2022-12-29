import { Tooltip } from '@mantine/core';
import { useContext, useState } from 'react';
import { FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-black text-slate-400 top-0 z-50">
      <nav className=" transition-all duration-500">
        <div className="flex justify-between items-center py-3 relative text-lg container w-[95%] mx-auto">
          <div className="">
            <Link to="/" className="text-gray-200 md:text-xl font-semibold flex items-center">
             
             <span> 
              <img src='https://web.programming-hero.com/home/ph_logo.svg' alt=''/></span>
             <span className='text-slate-400'> {'Task Manage'}</span>
            </Link>
          </div>
          <ul
            className={`hidden md:flex gap-5 items-center transition-all duration-300`}
          >
            <Link to="/add-task">Add Task</Link>
            <Link to="/my-tasks">My Tasks</Link>
            <Link to="/completed-tasks">Completed Tasks</Link>
            {!user ? (
              <>
                <Link
                  className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:ml-3 md:my-0"
                  to="/login"
                >
                  <Tooltip label="Login" position="bottom">
                    <button>
                      <FiLogIn title="login" className="mt-[7px]" />
                    </button>
                  </Tooltip>
                </Link>
              </>
            ) : (
              <Tooltip label="Logout">
                <button onClick={logout}>
                  LogOut
                </button>
              </Tooltip>
            )}
          </ul>
          <div className="block md:hidden">
            {!isOpen ? (
              <FiMenu
                className="text-xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : (
              <FiX
                className="text-xl cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </div>
        </div>
        <ul
          className={`absolute md:hidden top-[52px] gap-3 items-center transition-all duration-700 w-full flex flex-col py-4 bg-black text-gray-200 z-10 ${
            !isOpen ? 'opacity-0 -left-full' : 'opacity-100 left-0'
          }`}
        >
          <Link to="/add-task">Add Task</Link>
          <Link to="/my-tasks">My Tasks</Link>
          <Link to="/completed-tasks">Completed Tasks</Link>
        </ul>
      </nav>
    </header>
  );
}

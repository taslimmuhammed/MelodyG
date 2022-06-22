import React, {useState, useContext} from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import '../Styles/Navbar.css'
import logo from "../images/melodigy_logo.png";
import { SearchContext } from "../Context/SearchContext";
import {Link, useNavigate} from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false);
  const {proSearch, setproSearch} = useContext(SearchContext)
  const NavBarItem = ({ title, classprops , nav}) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}  onClick={()=>{navigate(nav); setToggleMenu(false)}}>{title}</li>
  );
  return (
    <nav className="w-full flex  justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      <li onClick={()=>navigate('/stake')} className="navbar_item">Create New Stake</li>
      <li onClick={()=>navigate('/withdraw')} className="navbar_item">Withdarw Stake</li>
          <li onClick={()=>navigate('/')} className="navbar_item">Home</li>
          <li onClick={()=>navigate('/mint')} className="navbar_item">Mint</li>
          <li onClick={()=>navigate('/swap')} className="navbar_item">Swap</li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>

            <NavBarItem  title="Create New Stake" classprops="my-2 text-lg mt-3"  nav="/stake"/>
            <NavBarItem  title="Withdarw Stake" classprops="my-2 text-lg mt-3" nav="/withdraw"/>
            <NavBarItem  title="Home" classprops="my-2 text-lg mt-3" nav="/"/>
            <NavBarItem  title="Mint" classprops="my-2 text-lg mt-3" nav="/mint"/>
            <NavBarItem  title="Swap" classprops="my-2 text-lg mt-3" nav="/swap"/>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

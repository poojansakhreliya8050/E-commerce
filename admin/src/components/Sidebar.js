import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// import logo from '../logo.png';

// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import { FaUserGroup } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
import { BsBorderStyle } from "react-icons/bs";



export default function Sidebar() {

  const [menuItems, setMenuItems] = useState(
    [
      {
        icons: <IoHomeOutline size={30} />,
        label: 'Home',
        isOpen: false,
        id: 1,
        subMenu: []
      },
      {
        icons: <FaProductHunt size={30} />,
        label: 'Products',
        isOpen: false,
        id: 2,
        subMenu: []
      },
      {
        icons: <MdOutlineDashboard size={30} />,
        label: 'Dashboard',
        isOpen: false,
        id: 3,
        subMenu: []
      },
      {
        icons: <FaUserGroup size={30} />,
        label: 'Sellers',
        isOpen: false,
        id: 4,
        subMenu: [
          {
            icons: <FaUserClock size={30} />,
            label: 'pending',
            isOpen: false,
            url: 'verifySeller/pending',
            id: 1
          },
          {
            icons: <FaUserCheck size={30} />,
            label: 'approved',
            isOpen: false,
            url: 'verifySeller/approved',
            id: 2
          },
          {
            icons: <FaUserSlash size={30} />,
            label: 'rejected',
            isOpen: false,
            url: 'verifySeller/rejected',
            id: 3
          }
        ]
      },
      {
        icons: <TbReportSearch size={30} />,
        label: 'Category',
        isOpen: false,
        id: 5,
        subMenu: []
      },
      {
        icons: <BsBorderStyle size={30} />,
        label: 'Orders',
        isOpen: false,
        id: 6,
        subMenu: []
      }
    ])

  const [open, setOpen] = useState(true)

  const toggleMenuItem = (id) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const closeMenu = () => {
    setOpen(!open)
    const updatedMenuItems = menuItems.map((item) =>
      item.isOpen ? { ...item, isOpen: false } : item
    );
    setMenuItems(updatedMenuItems);

  }

  return (
    <nav className={`h-screen sticky top-0 left-0 shadow-md  p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-16'}`}>

      {/* Header */}
      <div className=' px-3 py-2 h-20 flex justify-between items-center'>
        {/* <img src={logo} alt="Logo" className={`${open ? 'w-10' : 'w-0'} rounded-md`} /> */}
        <div><MdMenuOpen size={34} className={` duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => closeMenu()} /></div>
      </div>

      {/* Menu Items */}

      <ul className='flex-1'>
        {menuItems.map((item, index) => (
          <li key={item.id} >
            {
              item.subMenu.length != 0 ?
                <div onClick={() => toggleMenuItem(item.id)} key={index} className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                  <div>{item.icons}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                  <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>{item.label}</p>
                  {
                    item.subMenu.length > 0 && <MdKeyboardArrowDown size={30} className={`absolute right-2  duration-500 ${item.isOpen && ' rotate-180'} ${!open && 'hidden'}`} />
                  }
                </div>
                :
                <Link to={`/${item.label}`} onClick={() => toggleMenuItem(item.id)} key={index} className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                  <div>{item.icons}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                  <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>{item.label}</p>
                  {
                    item.subMenu.length > 0 && <MdKeyboardArrowDown size={30} className={`absolute right-2  duration-500 ${item.isOpen && ' rotate-180'} ${!open && 'hidden'}`} />
                  }
                </Link>
            }
            {item.isOpen && (
              <ul>
                {
                  item.subMenu.map((subItem, index) => (
                    <Link to={`/${subItem.url}`} key={index} className='pl-10 py-2 my-2  hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                      <div>{subItem.icons}</div>
                      <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{subItem.label}</p>
                      <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>{subItem.label}</p>
                    </Link>
                  ))
                }
              </ul>
            )}
          </li>
        ))}

      </ul>

      {/* footer */}
      <div className='flex items-center gap-2 px-3 py-2'>
        <div><FaUserCircle size={30} /></div>
        <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
          <p>Saheb</p>
          <span className='text-xs'>saheb@gmail.com</span>

        </div>
      </div>

    </nav>
  )
}

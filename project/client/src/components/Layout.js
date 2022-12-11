import { Badge } from "antd";
import React, { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { channelContext, userContext } from '../App';
import "./layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const user = useContext(userContext);


  const channel = useContext(channelContext);

  const location = useLocation();


  const userMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Book Your Seat",
      link: "/applyevent",
    },
    {
      name: "Check Status",
      link: "/showevents",
    },


  ];

  const adminMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Event List",
      link: "/admin/eventList",
    },
    {
      name: "Slots",
      link: "/admin/slots",
    },

  ];

  const menuToBeRendered = channel ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">ADNOX</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.link; //location.pathname >>>>> useLocation lle field aanu
              return (
                <div
                  className={`d-flex menu-item ${isActive &&
                    "active-menu-item"}`}
                >
                  <Link to={menu.link}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`d-flex menu-item`} >
              <Badge count={user ? user.unSeenNot.length : "0"} onClick={() => navigate('/notifications')} >
                <Link>Notifications</Link>
              </Badge>
            </div>

            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="d-flex"></div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

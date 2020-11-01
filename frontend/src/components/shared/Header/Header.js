import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './header.css';
import { logout } from '../../../actions/userActions';
import { SearchBox } from '../SearchBox/SearchBox';

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu mode="vertical">
      <Menu.Item key="0">
        <Link
          to="/profile"
          className={`link ${pathname === '/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="1" className="link" onClick={logoutHandler}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const adminMenu = (
    <Menu mode="vertical">
      <Menu.Item key="0">
        <Link
          to="/admin/userlist"
          className={`link ${pathname === '/admin/userlist' ? 'active' : ''}`}
        >
          Users
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link
          to="/admin/productlist"
          className={`link ${
            pathname === '/admin/productlist' ? 'active' : ''
          }`}
        >
          Products
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link
          to="/admin/orderlist"
          className={`link ${pathname === '/admin/orderlist' ? 'active' : ''}`}
        >
          Orders
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header>
      <nav>
        <div>
          <Link to="/" className="brand">
            Minimal
          </Link>
        </div>
        <div className="searchbox_container">
          <SearchBox />
        </div>
        <div className="link_container">
          <Link to="/" className={`link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link
            to="/cart"
            className={`link ${pathname === '/cart' ? 'active' : ' '}`}
          >
            Cart
          </Link>
          {userInfo ? (
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              trigger={['click']}
            >
              <a
                className="link"
                onClick={(e) => e.preventDefault()}
                href={pathname}
              >
                {userInfo.name} <DownOutlined />
              </a>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className={`link ${pathname === '/login' ? 'active' : ''}`}
            >
              Sign In
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <Dropdown
              overlay={adminMenu}
              placement="bottomCenter"
              trigger={['click']}
            >
              <a
                className="link"
                onClick={(e) => e.preventDefault()}
                href={pathname}
              >
                Admin <DownOutlined />
              </a>
            </Dropdown>
          )}
        </div>
      </nav>
    </header>
  );
};

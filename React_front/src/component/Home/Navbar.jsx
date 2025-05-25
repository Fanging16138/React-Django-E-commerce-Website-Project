import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Language from './Language';
import Search from './Search';
import Shop from './Shop';
import Login from './Login';
import useScrollPosition from '../../hooks/useScrollPosition';

const Navbar = () => {
  const scrolled = useScrollPosition();
  const [cartCount, setCartCount] = useState(Number(localStorage.getItem('cartCount')) || 0);

  useEffect(() => {
    // 监听自定义事件
    const handleCartCountUpdate = (event) => {
      setCartCount(event.detail.count);
    };
    window.addEventListener('cartCountUpdated', handleCartCountUpdate);

    // 从本地浏览器存储中获取购物车数量
    setCartCount(Number(localStorage.getItem('cartCount')) || 0); 

    return () => {
      window.removeEventListener('cartCountUpdated', handleCartCountUpdate);
    };
  }, []);

  return (
    <div className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <Language />
          <Search />
        </div>
        <div className="navbar-center">
          <h1 className="navbar-logo">LAMA.</h1>
        </div>
        <div className="navbar-right">
          <Login />
          <Shop />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
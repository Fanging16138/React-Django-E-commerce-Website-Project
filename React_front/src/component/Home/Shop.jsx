import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    cursor: pointer;
    display: inline-block;
`


function Shop() {
    const [cartKinds, setCartKinds] = useState(
        (() => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            return cart.length;
        })()
    );
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleCartChange = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartKinds(cart.length);
        };
        window.addEventListener('cartCountUpdated', handleCartChange);
        handleCartChange();
        return () => {
            window.removeEventListener('cartCountUpdated', handleCartChange);
        };
    }, []);

    const handleClick = () => {
        if (location.pathname !== '/cart') {
            navigate('/cart');
        }
        else {
            alert('当前已是购物车页面');
        }
    };

    return (
        <Container onClick={handleClick}>
            <div className="shop-container">
                <div className="cart-icon-container">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        className="cart-icon" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                    <span className="cart-count">{cartKinds}</span>
                </div>
            </div>
        </Container>
    )
}

export default Shop;
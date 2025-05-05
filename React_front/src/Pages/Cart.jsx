import React, { useState, useEffect } from 'react';
import Navbar from '../component/Home/Navbar';
import Footer from '../component/Home/Footer';
import Ads_top from '../component/Home/Ads_top';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { showLoginModal } from '../component/Home/Login';

const Container = styled.div``

const Wrapper = styled.div`
    margin-top: 10px;
    padding: 20px;
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #000;
    &:hover {
        background-color: #f8f8f8;
    }
`

const TopTexts = styled.div`
    display: flex;
    gap: 20px;
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`

const Info = styled.div`
    flex: 3;
    padding-left: 0;
    text-align: left;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    position: relative;
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    gap: 20px;
`

const Image = styled.div`
    width: 200px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.div`
    font-size: 20px;
    span {
        margin-left: 10px;
    }
`

const ProductColor = styled.div`
    font-size: 16px;
    span {
        margin-left: 10px;
    }
`

const ProductSize = styled.div`
    font-size: 16px;
    span {
        margin-left: 10px;
    }
`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
`

const Summary = styled.div`
    flex: 1;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 20px;
    height: 50vh;
    h2 {
        font-weight: 300;
        margin-bottom: 30px;
    }
`

const Remove = styled.button`
    cursor: pointer;
    margin-right: 10px;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background-color: #f8f8f8;
    border-radius: 50%;
    &:hover {
        background-color: #e0e0e0;
    }
`

const Add = styled.button`
    cursor: pointer;
    margin-left: 10px;
    border: none;
    width: 40px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background-color: #f8f8f8;
    border-radius: 50%;
    &:hover {
        background-color: #e0e0e0;
    }
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 20px;
    margin: 0 5px;
`

const ProductPrice = styled.div`
    font-size: 25px;
    font-weight: 500;
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const SummaryItem = styled.div`
    margin: 20px 0;
    padding-left: 0;
    text-align: left;
`

const SummaryItemText = styled.span`
    font-size: 16px;
    color: #666;
`

const SummaryItemPrice = styled.span`
    font-size: 16px;
    font-weight: 500;
    float: right;
`

const SummaryItemButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: black;
    color: white;
    border: none;
    font-weight: 600;
    margin-top: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #333;
    }
`

const SummaryTitle = styled.h2`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 30px;
`

const DeleteButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    color: #999;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    &:hover {
        color: #ff0000;
        transform: scale(1.1);
    }
`

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const syncCartCount = (cartArr) => {
        const totalItems = cartArr.reduce((sum, item) => sum + item.amount, 0);
        localStorage.setItem('cartCount', totalItems);
        window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: totalItems } }));
    };

    const handleAdd = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].amount += 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        syncCartCount(updatedCart);
    }

    const handleRemove = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].amount > 1) {
            updatedCart[index].amount -= 1;
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            syncCartCount(updatedCart);
        }
    }

    const handleDelete = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        syncCartCount(updatedCart);
    }

    const handleCheckout = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            showLoginModal(true, () => {
                navigate('/checkout');
            });
            return;
        }
        if (cartItems.length === 0) {
            alert('购物车为空');
            return;
        }
        
        // 清空购物车数据
        localStorage.removeItem('cart');
        localStorage.setItem('cartCount', '0');
        setCartItems([]);  // 更新组件状态
        
        // 触发事件更新其他组件
        window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: 0 } })); 
        alert('你已支付');
    }

    // 计算总价
    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.amount), 0);
        return total.toFixed(2);
    }

    return (
        <Container>
            <Navbar />
            <Ads_top />
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <TopButton onClick={() => navigate('/')}>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag({cartItems.length})</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton onClick={handleCheckout}>Checkout Now</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cartItems.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}>
                                Your cart is empty
                            </div>
                        ) : (
                            cartItems.map((item, index) => (
                                <Product key={index}>
                                    <DeleteButton onClick={() => handleDelete(index)}>×</DeleteButton>
                                    <ProductDetail>
                                        <Image>
                                            <img src={item.src} alt={item.name} />
                                        </Image>
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b>
                                                <span>{item.name}</span>
                                            </ProductName>
                                            <ProductColor>
                                                <b>Color:</b>
                                                <span>{item.color || 'default'}</span>
                                            </ProductColor>
                                            <ProductSize>
                                                <b>Size:</b>
                                                <span>{item.size || 'default'}</span>
                                            </ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Remove onClick={() => handleRemove(index)}>-</Remove>
                                            <ProductAmount>{item.amount}</ProductAmount>
                                            <Add onClick={() => handleAdd(index)}>+</Add>
                                        </ProductAmountContainer>
                                        <ProductPrice>${item.price}</ProductPrice>
                                    </PriceDetail>
                                </Product>
                            ))
                        )}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>${calculateTotal()}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                {cartItems.length > 0 ? 'Estimated Shipping' : ''}
                            </SummaryItemText>
                            <SummaryItemPrice>
                                {cartItems.length > 0 ? '$5.90' : ''}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                {cartItems.length > 0 ? 'Shipping Discount' : ''}
                            </SummaryItemText>
                            <SummaryItemPrice>
                                {cartItems.length > 0 ? '-$5.00' : ''}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText style={{fontWeight: '600', color: '#000'}}>Total</SummaryItemText>
                            <SummaryItemPrice style={{fontWeight: '600', color: '#000'}}>
                                {cartItems.length > 0 ? `$${(parseFloat(calculateTotal()) + 0.90).toFixed(2)}` : ''}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItemButton onClick={handleCheckout}>CHECKOUT NOW</SummaryItemButton>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart;

import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { fetchProducts } from "../../Data/products"
import BestProductItem from "./BestProductItem"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding: 0.5rem;  /* 20px */
    display: flex;
    flex-wrap: wrap; // 自动换行
    justify-content: space-between;
`

const LoadingMessage = styled.div`
    text-align: center;
    padding: 0.5rem;  /* 20px */
    font-size: 0.45rem;  /* 18px */
    color: #666;
`

const ErrorMessage = styled.div`
    text-align: center;
    padding: 0.5rem;  /* 20px */
    color: red;
    font-size: 0.45rem;  /* 18px */
`

const More = styled.button`
    background-color: transparent;
    border: none;
    font-size: 0.5rem;  /* 20px */
    cursor: pointer;
    color:rgba(147, 146, 146, 0.64);
    background: linear-gradient(
        100deg,
        rgb(0, 42, 255) 30%,
        rgb(255, 8, 8) 40%,
        rgb(17, 31, 95) 80%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shine 3s linear infinite;
    display: flex;
    align-items: center;
    gap: 0.25rem;  /* 10px */
    padding: 0.125rem 0.375rem;  /* 5px 15px */
    margin-left: auto;
    margin-right: 0.5rem;  /* 20px */
    transition: border-color 0.3s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.8);
    }

    @keyframes shine {
        0% {
            background-position: 100%;
        }
        100% {
            background-position: -100%;
        }
    }
`

const ArrowIcon = styled.img`
    width: 0.5rem;  /* 20px */
    height: 0.5rem;  /* 20px */
`

const BestProducts = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const result = await fetchProducts();
            if (result.success) {
                // 只显示销量大于等于100的商品
                const bestItems = result.data.filter(item => item.saled >= 100);
                setItems(bestItems);
                setError(null);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };

        getProducts();
    }, []);

    if (loading) {
        return <LoadingMessage>正在加载热销商品数据...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!items || items.length === 0) {
        return <ErrorMessage>暂无热销商品数据</ErrorMessage>;
    }

    return (
        <div>
            <Container>
                {items.map((item) => (
                    <BestProductItem item={item} key={item.id}/>
                ))}
            </Container>
            <More onClick={() => navigate('/products')}>
                <ArrowIcon src="/arrow-right.svg" alt="arrow icon" />
                More Products
            </More>
        </div>
    )
}
// 在 React 中，每个组件必须返回一个单一的父元素
export default BestProducts;

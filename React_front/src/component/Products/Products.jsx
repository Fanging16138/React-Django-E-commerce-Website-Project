import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../../Data/products";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #666;
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 20px;
    color: red;
    font-size: 18px;
`;

function Products({ sortType, priceSort, selectedCategories }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const result = await fetchProducts();
            
            if (result.success) {
                setItems(result.data);
                setError(null);
            } else {
                setError(result.error);
            }
            setLoading(false);
        };

        getProducts();
    }, []);

    // 使用 useMemo 处理筛选和排序逻辑
    const filteredAndSortedItems = useMemo(() => {
        let result = [...items];

        // 应用类别筛选
        if (selectedCategories?.clothing?.length > 0) {
            // 如果选择了 "All"，则不进行筛选
            if (!selectedCategories.clothing.includes('All')) {
                result = result.filter(item => 
                    selectedCategories.clothing.some(category => 
                        item.category.toLowerCase() === category.toLowerCase()
                    )
                );
            }
        }

        // 应用排序
        switch (sortType) {
            case 'sale':
                // 按销量从高到低排序
                result.sort((a, b) => b.saled - a.saled);
                break;
            case 'new':
                // 按时间从新到旧排序
                result.sort((a, b) => new Date(b.time) - new Date(a.time));
                break;
            case 'price':
                // 根据 priceSort 决定价格排序方向
                result.sort((a, b) => {
                    const priceA = parseFloat(a.price);
                    const priceB = parseFloat(b.price);
                    return priceSort ? priceA - priceB : priceB - priceA;
                });
                break;
            default:
                break;
        }

        return result;
    }, [items, sortType, priceSort, selectedCategories]);

    if (loading) {
        return <LoadingMessage>正在加载商品数据...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!filteredAndSortedItems || filteredAndSortedItems.length === 0) {
        return <ErrorMessage>暂无商品数据</ErrorMessage>;
    }

    return (
        <Container>
            {filteredAndSortedItems.map((item) => (
                <ProductItem item={item} key={item.id}/>
            ))}
        </Container>
    );
}

export default Products;

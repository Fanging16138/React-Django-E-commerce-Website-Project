import styled from "styled-components";
import Navbar from "../Home/Navbar";
import Ads_top from "../Home/Ads_top";
import Products from "./Products";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScreenForm from "./ScreenForm";

const Container = styled.div`
    margin-top: 50px;
    padding-left: 0;
    text-align: left;
`

// const Title = styled.h1`
//     font-size: 40px;
//     margin: 5px;
// `

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(239, 252, 255, 0.6);
`

const Filter = styled.div`
    margin: 10px;
    display: flex;
    gap: 20px;  // 添加间距
`

const Title = styled.h3`
    font-size: 15px;
    font-weight: 500;
    margin: 0;
    padding: 0;
`

const Sale = styled.button`
    border: none;
    padding: 8px 15px;
    background-color: ${props => props.active ? 'rgba(166, 227, 202, 0.5)' : 'rgba(227, 227, 227, 0.3)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    outline: none;
    
    &:active, &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    &::-moz-focus-inner {
        border: 0;
    }
`

const Price = styled.button`
    border: none;
    padding: 8px 15px;
    background-color: ${props => props.active ? 'rgba(166, 227, 202, 0.5)' : 'rgba(227, 227, 227, 0.3)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    outline: none;
    
    &:active, &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    &::-moz-focus-inner {
        border: 0;
    }
`

const ArrowIcon = styled.img`
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
`

const New = styled.button`
    border: none;
    padding: 8px 15px;
    background-color: ${props => props.active ? 'rgba(166, 227, 202, 0.5)' : 'rgba(227, 227, 227, 0.3)'};
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    outline: none;
    
    &:active, &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    &::-moz-focus-inner {
        border: 0;
    }
`

const FilterCategory = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 15px;
    font-size: 15px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        color: #333;
    }
`

const Screen = styled.button`
    border: none;
    padding: 8px 15px;
    background-color: rgba(227, 227, 227, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.3s ease;
    outline: none;
    
    &:active, &:focus {
        outline: none;
        border: none;
        box-shadow: none;
    }

    &::-moz-focus-inner {
        border: 0;
    }
`

const ScreenIcon = styled.img`
    width: 16px;
    height: 16px;
`

function ProductList() {
    const location = useLocation();
    const [sortType, setSortType] = useState(null);
    const [priceSort, setPriceSort] = useState(null);
    const [isScreenOpen, setIsScreenOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState({
        clothing: []
    });

    // 处理初始排序和分类
    useEffect(() => {
        if (location.state?.sortType) {
            setSortType(location.state.sortType);
        }
    }, [location.state?.sortType]);

    const handlePriceSort = () => {
        setSortType('price');
        setPriceSort(prev => {
            if (prev === null) return true;  // 首次点击，从低到高
            return !prev;  // 切换排序方向
        });
    };

    const handleSaleClick = () => {
        setSortType(prev => prev === 'sale' ? null : 'sale');
        setPriceSort(null);
    };

    const handleNewClick = () => {
        setSortType(prev => prev === 'new' ? null : 'new');
        setPriceSort(null);
    };

    const handleScreenClick = () => {
        setIsScreenOpen(!isScreenOpen);
    };

    const handleApplyFilter = (categories) => {
        setSortType(null);
        setPriceSort(null);
        setSelectedCategories(categories);
        setIsScreenOpen(false);
    };

    return (
        <div>
        <Container>
            <Navbar />
            <Ads_top />
            <FilterContainer>
                <Filter>
                    <Sale 
                        onClick={handleSaleClick}
                        active={sortType === 'sale'}
                    >
                        <Title>Sales volume</Title>
                    </Sale>
                    <New 
                        onClick={handleNewClick}
                        active={sortType === 'new'}
                    >
                        <Title>New</Title>
                    </New>
                    <Price 
                        onClick={handlePriceSort}
                        active={sortType === 'price'}
                    >
                        <Title>Price</Title>
                        {priceSort === true && <ArrowIcon src="/caret-up-fill.svg" alt="sort up" />}
                        {priceSort === false && <ArrowIcon src="/caret-down-fill.svg" alt="sort down" />}
                    </Price>
                </Filter>
                <FilterCategory>
                    <Screen onClick={handleScreenClick}>
                        <Title>Screening</Title>
                        <ScreenIcon 
                            src="/chevron-down.svg" 
                            alt="screen"
                            style={{ transform: isScreenOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                        />
                    </Screen>
                    <ScreenForm isOpen={isScreenOpen} onApply={handleApplyFilter} />
                </FilterCategory> 
            </FilterContainer>
            
        </Container>
        <Products 
                sortType={sortType}
                priceSort={priceSort}
                selectedCategories={selectedCategories}
            />
        </div>
    )
}

export default ProductList;

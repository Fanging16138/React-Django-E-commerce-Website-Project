import React from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion'; // 动画库
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    flex: 1;
    margin: 0.125rem;  /* 5px */
    height: 65vh;
    position: relative;
    @media (max-width: 480px) {
        height: 30vh;
        width: 100%;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2%;
    @media (max-width: 480px) {
        height: 100%;
        width: 100%;
    }
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center; //水平居中
    justify-content: center; //垂直居中
    flex-direction: column;  //垂直布局
    @media (max-width: 480px) {
        width: 100%;
        height: 100%;
    }
`

const Title = styled.h1`
    font-size: 1.125rem;  /* 45px */
    color: white;
    margin-bottom: 0.5rem;  /* 20px */
    -webkit-text-stroke: 0.05rem black;  /* 2px */
    @media (max-width: 480px) {
        font-size: 1.2rem;  /* 15px */
        -webkit-text-stroke: none;  // 取消边框
        text-shadow: none;  // 取消阴影
    }
    text-shadow: 
        0.05rem 0.05rem 0 #000,  /* 2px */
        -0.05rem -0.05rem 0 #000,  /* -2px */
`

const Button = styled(motion.button)`
    padding: 0.25rem;  /* 10px */
    background-color: white;
    color: rgb(58, 65, 65);
    border: none;
    cursor: pointer;
    font-weight: 600;
    @media (max-width: 480px) {
        font-size: 0.8rem; 
    }
`


const CategoryItem = ({item}) => {
    const navigate = useNavigate();
    const handleShopNow = (itemId) => {
        switch (itemId) {
            case 1:
                // 跳转到T-shirt筛选页面
                navigate('/products', { 
                    state: { 
                        initialCategory: 'T-shirt',
                        sortType: null
                    } //state: 传递给筛选页面的初始状态
                });
                break;
            case 2:
                // 跳转到Coat筛选页面
                navigate('/products', { 
                    state: { 
                        initialCategory: 'Coat',
                        sortType: null
                    }
                });
                break;
            case 3:
                // 跳转到All并按销量排序
                navigate('/products', { 
                    state: { 
                        initialCategory: 'Jacket',
                        sortType: null
                    }
                });
                break;
            default:
                navigate('/products');
        }
    };
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button onClick={() => handleShopNow(item.id)}
                    whileHover={{ 
                        scale: 1.1,
                        transition: { 
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }
                    }}
                    whileTap={{ scale: 0.8 }}
                >
                    SHOP NOW
                </Button>
            </Info>
        </Container>
    )
}

export default CategoryItem;

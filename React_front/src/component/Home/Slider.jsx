import React, { useState } from 'react'; //用useState记得引入！
import styled from 'styled-components';
import { sliderItems } from '../../Data/slider_data';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    position: relative;
    overflow: hidden; //超出隐藏
    margin-top: 0.2rem;
    @media (max-width: 480px) {
        height: 31vh;
        width: 100%;
        margin-top: 1.5rem;
    }
`;

const Arrow = styled.div`
    width: 1.25rem;  /* 50px */
    height: 1.25rem;  /* 50px */
    background-color: #fff7f7;
    border-radius: 50%;  //设置圆角  越大越圆
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;  //光标
    opacity: 0.6;   //设置透明度为0.5
    z-index: 2;
    left: ${props => props.direction === "left" && "0.25rem"};  /* 10px */
    right: ${props => props.direction === "right" && "0.25rem"};  /* 10px */
`;

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    transition: all 1.5s ease; //过渡动画
    transform: translateX(${(props)=>props.$slideIndex * -100}%);
`;

const Slide = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.$bg};//props.bg 是传入的背景颜色
    @media (max-width: 480px) {
        height: 55vh;
        width: 100%;
    }
`

const ImageContainer = styled.div`
    width: 100vw;
    height: 100%;
    flex: 1;
    display: flex;
    @media (max-width: 480px) {
        height: 100%;
    }
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 1rem;  /* 40px */
    @media (max-width: 480px) {
        height: 55vh;
        width: 100%;
        padding: 0;
        margin-top: 1.75rem;  /* 70px */
    }
`

const Image = styled.img`
    height: 100%;
    @media (max-width: 480px) {
        height: 57%;
        padding-right: 0.25rem;  /* 10px */
    }
`

const Title = styled.h1`
    font-size: 1.75rem;  /* 70px */
    margin-bottom: 0.25rem;  /* 10px */
    @media (max-width: 480px) {
        font-size: 2.5rem; 
        margin-bottom: 2.3rem; 
        margin-top: 2.7rem;
    }
`

const Desc = styled.p`
    font-size: 0.5rem;  /* 20px */
    margin: 1.25rem 0;  /* 50px */
    font-weight: 500;
    letter-spacing: 0.075rem;  /* 3px */
    @media (max-width: 480px) {
        font-size: 0.8rem;  /* 8px */
        margin: 0.5rem 0.075rem;  /* 20px 3px */
        margin-bottom: 0.375rem;  /* 15px */
        padding-right: 0.25rem;  /* 10px */
    }
`

const Button = styled.button`
    padding: 0.3rem;  /* 12px */
    font-size: 0.5rem;  /* 20px */
    background-color: transparent;
    border: 0.05rem solid rgb(139, 173, 153);  /* 2px */
    cursor: pointer;
    padding-left: 0.5rem;  /* 20px */
    padding-right: 0.5rem;  /* 20px */
    transition: all 0.3s ease;
    &:hover {
        background-color: rgb(18, 16, 24);
        color: white;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;  /* 8px */
        padding: 0.5rem;  /* 12px */
        border-radius: 0.9rem;
        margin-top: 0.8rem;
    }
`

function Slider() {

    const [slideIndex, setSlideIndex] = useState(0);
    const navigate = useNavigate();
    
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1); 
            //如果slideIndex大于0，则减1，否则为sliderItems.length - 1
            //实现第一张左边轮播
        } else {
            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
            //如果slideIndex小于sliderItems.length - 1，则加1，否则为0
            //实现最后一张右边轮播
        }
    }

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
                        initialCategory: 'All',
                        sortType: 'sale'
                    }
                });
                break;
            default:
                navigate('/products');
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                >
                    <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"/>
                </svg>
            </Arrow>
            <Wrapper $slideIndex={slideIndex}>
                {sliderItems.map((item) => (
                <Slide $bg={item.bg} key={item.id}>
                <ImageContainer>
                    <Image src={item.img}></Image>
                </ImageContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Button onClick={() => handleShopNow(item.id)}>SHOP NOW</Button>
                </InfoContainer>
                </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                >
                    <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671"/>
                </svg>
            </Arrow>
        </Container>
    );
}

export default Slider;

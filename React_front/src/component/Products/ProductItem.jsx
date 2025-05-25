import styled from "styled-components";
import BestProductItem from "../Home/BestProductItem";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../context/LanguageContext';

const Container = styled.div`
    flex: 1;
    margin: 15px;
    position: relative;
    min-width: 280px;
    height: 370px;
    transition: all 0.3s ease; // 过渡效果
    cursor: pointer;
    
    &:hover {
        background-color: rgb(243, 243, 243);  // 背景颜色
    }
`

const Image = styled.img`
    width: 80%;
    height: 80%;
    object-fit: cover;
`
const InfoContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 96%;
    padding: 5px;
    background: linear-gradient(to top, rgba(166, 166, 166, 0.8), transparent);
`

const Title = styled.h3`
    color: black;
    font-size: 18px;
    margin: 10px;
    margin-bottom: 5px;
`

const Price = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
`

const Saled = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
    margin-top: 5px;
`

function ProductItem({item}) {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const handleClick = () => {
        navigate(`/products/${item.id}`);
    };

    if (item.saled >= 100) {
        return <BestProductItem item={item} onClick={handleClick}/>
    }
    
    return (
        <Container onClick={handleClick}>
            <Image src={item.img} key={item.id}/>
            <InfoContainer>
                <Title>{language === 'English' ? item.title_en : item.title_cn}</Title>
                <Price>${item.price}</Price>
                <Saled>Saled: {item.saled} Pieces</Saled>
            </InfoContainer>
        </Container>
    )
}

export default ProductItem;

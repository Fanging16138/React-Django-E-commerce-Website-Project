import styled from "styled-components"
import { useNavigate } from "react-router-dom";

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

const BestSellerTag = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgb(238, 216, 138);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
`

const FireIcon = styled.img`
    width: 16px;
    height: 16px;
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
    margin: 3px;
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

const BestProductItem = ({item}) => {
    const navigate = useNavigate();

    // 只有当销售量大于100时才渲染组件
    if (item.saled <= 100) {
        return null;
    }

    const handleClick = () => {
        navigate(`/products/${item.id}`);
    };

    return (
        <Container onClick={handleClick}>
            <Image src={item.img} key={item.id}/>
            {item.saled > 100 && (
                <BestSellerTag>
                    <FireIcon src="/fire.svg" alt="fire icon" />
                    Best Seller
                </BestSellerTag>
            )}
            <InfoContainer>
                <Title>{item.title_en || item.title_cn}</Title>
                <Price>${item.price}</Price>
                <Saled>Saled: {item.saled} Pieces</Saled>
            </InfoContainer>
        </Container>
    )
}

export default BestProductItem;

import styled from 'styled-components';

const TitleContainer = styled.div`
    text-align: center;
    margin-top: 0.5rem;  /* 20px */
    display: inline-flex; // 容器适应内容大小
    align-items: center;
    justify-content: center;
    gap: 0.25rem;  /* 10px */
    background-color: rgb(238, 216, 138);
    padding: 0.25rem 0.75rem;  /* 10px 30px */
    border-radius: 0.2rem;  /* 8px */
`

const Title = styled.h1`
    font-size: 1rem;  /* 40px */
    color: black;
    margin: 0;
`

const FireIcon = styled.img`
    width: 0.675rem;  /* 27px */
    height: 0.675rem;  /* 27px */
`

function BestTitle() {
    return (
        <TitleContainer>
            <Title>Best Sellers Products</Title>
            <FireIcon src="/fire.svg" alt="fire icon" />
        </TitleContainer>
    )
}

export default BestTitle;

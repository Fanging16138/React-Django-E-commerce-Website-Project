import styled from 'styled-components';
import useScrollPosition from '../../hooks/useScrollPosition';

const Container = styled.div`
    height: 30px;
    background-color: rgb(90, 191, 159);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    transform: translateY(${props => props.$hide ? '-100%' : '0'});
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;

    @media (max-width: 480px) {
        height: 20px;
        padding: 0 10px;
    }
`;

const Content = styled.div`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;

    @media (max-width: 768px) {
        font-size: 12px;
        letter-spacing: 0.5px;
        padding: 0 15px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        letter-spacing: 0.3px;
        padding: 0 10px;
        max-width: 90vw;
    }
`;

function Ads_top() {
    const scrolled = useScrollPosition();

    return (
        <Container $hide={scrolled}>
            <Content>
            Super Deal! Free Shipping on Orders Over $50
            </Content>
        </Container>
    )
}

export default Ads_top;

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
`;

const Content = styled.div`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    padding: 0 20px;
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

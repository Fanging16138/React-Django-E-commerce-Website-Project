import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    flex: 1;
    display : flex;
    padding: 20px;
    background-color: rgb(245, 245, 245);
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column; // 垂直排列
    padding: 5px;
`
const Logo = styled.h1`
    margin-bottom: 10px;
    padding-left: 20px;
    text-align: left;
    font-size: 40px;
    font-weight: bold;
`

const Desc = styled.p`
    margin: 20px 2px;
    font-size: 15px;
    text-align: left;  // 文字左对齐
    padding-left: 0;   // 移除左内边距
    max-width: 80%;    // 控制文本宽度
    line-height: 1.5;  // 行高
`

const SocialContainer = styled.div`
    display: flex;
    gap: 25px; // 图标之间的间距
`

const SocialIcon = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`

const FacebookIcon = styled(SocialIcon)`
    background-color: #1877F2;
    &:hover {
        background-color: #166FE5;
    }
`

const InstagramIcon = styled(SocialIcon)`
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    &:hover {
        opacity: 0.9; // 鼠标悬停时，图标颜色变暗
    }
`

const TwitterIcon = styled(SocialIcon)`
    background-color: #1DA1F2;
    &:hover {
        background-color: #1A91DA;
    }
`

const GoogleIcon = styled(SocialIcon)`
    background: conic-gradient(
        #EA4335 0deg 120deg,
        #FBBC05 120deg 240deg,
        #34A853 240deg 360deg
    );
    &:hover {
        opacity: 0.9;
    }
`

const Icon = styled.img`
    width: 25px;
    height: 25px;
    filter: brightness(0) invert(1); // 将图标颜色改为白色
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
`

const Title = styled.h2`
    margin-bottom: 30px;
    padding-left: 0;
    text-align: left;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    text-align: left;
    
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        color:rgb(74, 194, 237);
    }
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    &:hover {
        color:rgb(74, 194, 237);
    }
`

const ContactIcon = styled.img`
    width: 20px;
    height: 20px;
    filter: brightness(0) saturate(100%) invert(38%) sepia(99%) saturate(2476%) hue-rotate(202deg) brightness(98%) contrast(96%); // 蓝色
`

const Map = styled(ContactIcon)``
const Phone = styled(ContactIcon)``
const Mail = styled(ContactIcon)``

function Footer () {
    const navigate = useNavigate();
    return (
    <Container>
        <Left>
            <Logo>LAMA.</Logo>
            <Desc>
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don't look even slightly believable.
            </Desc>
            <SocialContainer>
                <FacebookIcon>
                    <Icon src="/facebook.svg" alt="facebook" />
                </FacebookIcon>
                <InstagramIcon>
                    <Icon src="/instagram.svg" alt="instagram" />
                </InstagramIcon>
                <TwitterIcon>
                    <Icon src="/twitter.svg" alt="twitter" />
                </TwitterIcon>
                <GoogleIcon>
                    <Icon src="/google.svg" alt="google" />
                </GoogleIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem onClick={() => navigate('/home')}>Home</ListItem>
                <ListItem onClick={() => navigate('/cart')}>Cart</ListItem>
                <ListItem onClick={() => navigate('/products')}>Clothes</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Map src="/geo-alt-fill.svg" alt="location" />
                622 Dixie Path , South Tobinchester 98336
            </ContactItem>
            <ContactItem>
                <Phone src="/telephone-plus-fill.svg" alt="phone" />
                +153 4788 7908
            </ContactItem>
            <ContactItem>
                <Mail src="/envelope-at-fill.svg" alt="email" />
                2136772729 @qq.com
            </ContactItem>
        </Right>
    </Container>
    )
}

export default Footer;
// 页尾详细
import styled from "styled-components"
import { useRef } from "react"
const Container = styled.div`
    height: 65vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 80px;
`
const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 20px;
`
const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: teal;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Send = styled.img`
    width: 20px;
    height: 20px;
`


function Newsletter() {
    const input = useRef(null);
    const handleSend = () => {
        if (!input.current || input.current.value === '') {
            alert('输入为空');
            return;
        }
        alert('发送成功');
    }
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer>
                <Input ref={input} />
                <Button onClick={handleSend}>
                    <Send src="/send.svg" alt="send icon" />
                </Button>
            </InputContainer>
        </Container>
    )
} 

export default Newsletter;

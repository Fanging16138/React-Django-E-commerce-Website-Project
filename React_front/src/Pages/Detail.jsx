import styled from "styled-components";
import Navbar from "../component/Home/Navbar";
import Ads_top from "../component/Home/Ads_top";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoginModal } from '../component/Home/Login';
import { useLanguage } from '../context/LanguageContext';

const Container = styled.div`
    position: relative;
`

const BackButton = styled.div`
    position: absolute;
    top: 3rem;  /* 120px */
    left: 0.5rem;  /* 20px */
    width: 1rem;  /* 40px */
    height: 1rem;  /* 40px */
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0.05rem 0.125rem rgba(0,0,0,0.1);  /* 0 2px 5px */
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,0.2);  /* 0 4px 8px */
    }

    svg {
        width: 0.6rem;  /* 24px */
        height: 0.6rem;  /* 24px */
        color: #333;
    }
`

const Wrapper = styled.div`
    padding: 1.25rem;  /* 50px */
    display: flex;
`

const ImageContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 15rem;
    height: 17rem;
    object-fit: cover;
    @media (max-width: 12rem) {  /* 480px */
        height: 7.5rem;  /* 30vh */
        width: 12.5rem;  /* 50vw */
    }
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 1.25rem;  /* 0px 50px */
    padding-left: 2rem;  /* 80px */
    text-align: left;
`

const Title = styled.h1`
    font-weight: 200;
    font-size: 1.25rem;  /* 20px */
`

const Price = styled.span`
    font-weight: 100;
    font-size: 1rem;  /* 40px */
`

const Desc = styled.p`
    margin: 0.5rem 0;  /* 20px 0px */
    font-size: 0.4rem;  /* 16px */
`

const Time = styled.p`
    margin: 0.5rem 0;  /* 20px 0px */
    color: #666;
    font-size: 0.4rem;  /* 16px */
`

const Saled = styled.p`
    margin: 0.5rem 0;  /* 20px 0px */
    color: #666;
    font-size: 0.4rem;  /* 16px */
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 0.75rem 0;  /* 30px 0px */
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 0.5rem;  /* 20px */
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 0.5rem;  /* 20px */
    height: 0.5rem;  /* 20px */
    border-radius: 50%;
    background: ${props =>{
        if (props.$color.includes('and')) {
            const [color1, color2] = props.$color.split(' and ');
            return `linear-gradient(to right, ${color1} 0%, ${color1} 50%, ${color2} 50%, ${color2} 100%)`;
        }
        else if (props.$color.includes('_')) {
            return props.$colorMapping[props.$color]?.code || props.$color;
        }
        else{
            return props.$color;
        }
    }};
    margin: 0 0.15rem;  /* 0px 6px */
    cursor: pointer;
    margin-left: 0.2rem;  /* 8px */
    border: ${props => props.$selected ? '0.05rem solid #000' : '0.025rem solid #ddd'};  /* 2px : 1px */
`

const FilterSize = styled.select`
    margin-left: 0.25rem;  /* 10px */
    padding: 0.075rem;  /* 3px */
    cursor: pointer;
    font-size: 0.4rem;  /* 16px */
`

const FilterSizeOption = styled.option`
    cursor: pointer;
`

const AddContainer = styled.div``

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;  /* 40px */
`

const Amount = styled.span`
    font-size: 0.5rem;  /* 20px */
    margin: 0 0.25rem;  /* 0 10px */
`

const Button = styled.button`
    margin-top: 1rem;  /* 40px */
    padding: 0.5rem 1rem;  /* 20px 40px */
    font-size: 0.5rem;  /* 20px */
    &:hover {
        background-color: rgb(226, 226, 226);
    }
`

const Remove = styled.button`
    cursor: pointer;
    margin-right: 0.25rem;  /* 10px */
    border: none;
    width: 0.75rem;  /* 30px */
    height: 0.75rem;  /* 30px */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.45rem;  /* 18px */
    background-color: #f8f8f8;
    border-radius: 50%;
    &:hover {
        background-color: #e0e0e0;
    }
`

const Add = styled.button`
    cursor: pointer;
    margin-left: 0.25rem;  /* 10px */
    border: none;
    width: 0.75rem;  /* 30px */
    height: 0.75rem;  /* 30px */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.45rem;  /* 18px */
    background-color: #f8f8f8;
    border-radius: 50%;
    &:hover {
        background-color: #e0e0e0;
    }
`

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [amount, setAmount] = useState(1);
    const [product, setProduct] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 获取所有商品数据
                const productsRes = await axios.get('http://127.0.0.1:8000/api/products/');
                if (productsRes.data.status === 'success') {
                    // 从所有商品中筛选当前id的商品
                    const currentProduct = productsRes.data.data.find(item => item.id === parseInt(id));
                    if (currentProduct) {
                        setProduct(currentProduct);
                    }
                }

                // 获取所有商品详情数据
                const detailsRes = await axios.get('http://127.0.0.1:8000/api/products/details/');
                if (detailsRes.data.status === 'success') {
                    // 从所有详情中筛选当前id的详情
                    const currentDetail = detailsRes.data.data.find(item => item.id === parseInt(id));
                    if (currentDetail) {
                        setProductDetail(currentDetail);
                        // 设置默认选中的颜色
                        if (currentDetail.color && currentDetail.color.length > 0) {
                            setSelectedColor(currentDetail.color[0]);
                        }
                    }
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData(); // 直接执行
    }, [id]);

    const handleAdd = () => {
        setAmount(amount + 1);
    }

    const handleRemove = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
        else {
            alert("Amount cannot be less than 1");
        }
    }

    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            showLoginModal(true, () => {
                handleAddToCart(); // 重新执行添加购物车操作
            });
            return;
        }

        // 检查是否选择了尺寸
        if (productDetail.size && productDetail.size.length > 0 && !selectedSize) {
            alert("请选择商品尺寸");
            return;
        }

        // 构建购物车商品数据
        const cartItem = {
            id: product.id,
            src: `/Images/Products/${product.category}/${productDetail.number}/${selectedColor || 'default'}.jpg`,
            name: product.title_en || product.title_cn,
            price: product.price,
            color: selectedColor,
            size: selectedSize,
            amount: amount
        };

        // 获取现有的购物车数据
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // 检查是否已存在相同商品（相同ID、颜色和尺寸）
        const existingItemIndex = cart.findIndex(item => 
            item.id === cartItem.id && 
            item.color === cartItem.color && 
            item.size === cartItem.size
        );

        if (existingItemIndex !== -1) {
            // 如果存在，更新数量
            cart[existingItemIndex].amount += cartItem.amount;
        } else {
            // 如果不存在，添加新商品
            cart.push(cartItem);
        }

        // 保存到localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        //购物车数字=商品种类数
        const totalItems = cart.length;
        localStorage.setItem('cartCount', totalItems);
        window.dispatchEvent(new CustomEvent('cartCountUpdated', { detail: { count: totalItems } }));
        console.log(cart);
        console.log(totalItems);
        alert("已添加到购物车");
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product || !productDetail) {
        return <div>No product found</div>;
    }

    return (
        <Container>
            <Navbar />
            <Ads_top />
            <BackButton onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </BackButton>
            <Wrapper>
                <ImageContainer>
                    <Image src={`/Images/Products/${product.category}/${productDetail.number}/${selectedColor || 'default'}.jpg`} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{language === 'English' ? product.title_en : product.title_cn}</Title>
                    <Price>${product.price}</Price>
                    <Desc>{language === 'English' ? productDetail.desc_en : productDetail.desc_cn}</Desc>
                    <Saled>Sales: {product.saled} Pieces</Saled>
                    <Time>Listed: {new Date(product.time).toLocaleDateString()}</Time>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {productDetail.color.map((color) => (
                                <FilterColor 
                                    key={color}
                                    $color={color}
                                    $colorMapping={productDetail.color_mapping}
                                    $selected={selectedColor === color}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </Filter>
                        {productDetail.size && productDetail.size.length > 0 && (
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                                <FilterSize 
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    <FilterSizeOption value="">Select Size</FilterSizeOption>
                                    {productDetail.size.map((sizeOption) => (
                                        <FilterSizeOption key={sizeOption} value={sizeOption}>
                                            {sizeOption}
                                        </FilterSizeOption>
                                    ))}
                            </FilterSize>
                        </Filter>
                        )}
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={handleRemove}>-</Remove>
                            <Amount>{amount}</Amount>
                            <Add onClick={handleAdd}>+</Add>
                        </AmountContainer>
                        <Button onClick={handleAddToCart}>Add To Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
        </Container>
    );
}

export default Detail;





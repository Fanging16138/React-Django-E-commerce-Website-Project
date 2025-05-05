import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../../Data/categories";


const Container = styled.div`
    display: flex; // 水平布局
    padding: 20px;
    justify-content: space-between; // 中间的项目会均匀地分布在首尾之间
`

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem item={item}  key={item.id}/>
            ))}
        </Container>
    )
}

export default Categories;

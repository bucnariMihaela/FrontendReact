import * as React from 'react'
import { Col, Row} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {useAuth} from "./AuthProvider";
import { useNavigate } from 'react-router-dom';
import product from "./Product";


interface ProductProps {
    id:string;
    name: string;
    price: number;
    image: string;
}

const Product: React.FC<ProductProps> = ({name, price, id, image}) => {
    const { authState, setAuthState } = useAuth();
    const navigate = useNavigate();

    const handleProductClick = () =>{
        navigate('/ProductDetails/'+ id)
    }


    return (
        <>
           <Col span={24} className={"product-col"} onClick={handleProductClick}>
               <Row className={"product-row"}> <img src={image} width={200} height={200} /></Row>
               <Row className={"product-row"}> {name}</Row>
               <Row className={"product-row"}>
                   <Col span={12}> {price}</Col>
                   <Col span={12}> {authState.isAuthenticated === true &&<ShoppingCartOutlined style={{ fontSize: '24px' }} />}</Col>
               </Row>
        </Col>
            </>
    );
}

export default Product
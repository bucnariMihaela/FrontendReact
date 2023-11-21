import * as React from 'react'
import { Col, Row} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {useAuth} from "./AuthProvider";
import { useNavigate } from 'react-router-dom';


interface ProductProps {
    name: string;
    price: number;
}

const Product: React.FC<ProductProps> = ({name, price}) => {
    const { authState, setAuthState } = useAuth();
    const navigate = useNavigate();

    const handleProductClick = () =>{
        navigate('/ProductDetails')
    }


    return (
        <>
           <Col span={24} className={"product-col"} onClick={handleProductClick}>
               <Row className={"product-row"}> imagine produs</Row>
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
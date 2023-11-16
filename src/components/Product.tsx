import React from 'react'
import { Col, Row} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface ProductProps {
    name: string;
    price: number;
}



const Product: React.FC<ProductProps> = ({name, price}) => {
    return (
        <>
           <Col span={24}>
               <Row className={"product-row"}> imagine produs</Row>
               <Row className={"product-row"}> {name}</Row>
               <Row className={"product-row"}>
                   <Col span={12}> {price}</Col>
                   <Col span={12}> <ShoppingCartOutlined style={{ fontSize: '24px' }} /></Col>
               </Row>
        </Col>
            </>
    );
}

export default Product
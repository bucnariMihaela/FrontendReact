import React, {useEffect, useState} from 'react';
import { Col, Row } from 'antd';
import Product from "./Product";

export interface Product {
    id: string
    productName: string
    description: string
    price: number
    stock: Stock
    colors: Color[]
}

export interface Stock {
    quantity: number
}

export interface Color {
    id: string
    colorName: string
    red: number
    green: number
    blue: number
}

const Dashboard: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <Row justify={"space-evenly"}>
            {products.map((product) => {
                return(
                        <Col key ={product.id} xs={{span: 5, offset: 1}}>
                            <Product name={product.productName}
                                    price = {product.price}

                            />
                        </Col>
                )
                }
            )}
            </Row>

        </>
    )
};

export default Dashboard;

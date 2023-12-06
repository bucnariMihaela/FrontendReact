// @ts-ignore
import React, {useEffect, useState} from 'react';
import { Col, Row } from 'antd';
import Product from "./Product";
import {Product as ProductType} from "../components/Types";
const Dashboard: React.FC = () => {

    const [products, setProducts] = useState<ProductType[]>([]);
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
                            <Product
                                image = {product.image}
                                name={product.productName}
                                    price = {product.price}
                                     id={product.id}
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

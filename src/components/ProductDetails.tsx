import * as React from 'react';
import {Card, Col, Row, Select} from 'antd';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Product} from "./Types";
const { Meta } = Card;





const ProductDetails: React.FC = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        fetch(`http://localhost:8080/products/`+productId)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProduct(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);




    return(
        <Row justify={"center"}>
            <Col span={12} className={"product-col"} >
                <Row className={"product-row"}> {product?.productName}</Row>
                <Row className={"product-row"}>
                    <Col span={12}> <img width={300} alt="example" src={product?.image} /></Col>
                    <Col span={12}>
                        <Row> {product?.description}</Row>
                        <Row> {product?.price}</Row>
                        <Row>
                            <Select
                                showSearch
                                placeholder="Select a color"
                                optionFilterProp="children"
                               // onChange={onChange}
                                options={product?.colors?.map(color => ({
                                    value: color.id,
                                    label: color.colorName
                                }))}
                            />
                        </Row>
                        <Row> <ShoppingCartOutlined style={{ fontSize: '24px' }} /></Row>
                    </Col>
                </Row>
            </Col>


        </Row>

)}

export default ProductDetails;
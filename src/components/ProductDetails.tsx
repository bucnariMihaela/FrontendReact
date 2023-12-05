import * as React from 'react';
import { Col, Row, Select} from 'antd';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Product} from "./Types";
import { useNavigate } from 'react-router-dom';
import {CartProductType, useCart} from "./CartContext";






const ProductDetails: React.FC = () => {

    const {productId} = useParams();

    const [product, setProduct] = useState<Product>();

    const navigate = useNavigate();

    const {cartItems, addToCart, removeFromCart} = useCart();


    useEffect(() => {
        fetch(`http://localhost:8080/products/` + productId)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProduct(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const handleAddToCart = () => {
        if (product && product.stock) {
            const cartItem: CartProductType = {
                id: product.id,
                productName: product.productName,
                price: product.price,
                image: product.image,
                quantity: product.stock.quantity
            };
            addToCart(cartItem)
        }

    };
        return (
            <Row justify={"center"}>
                <Col span={12} className={"product-col"}>
                    <Row className={"product-row"}> {product?.productName}</Row>
                    <Row className={"product-row"}>
                        <Col span={12}> <img width={400} height={400} alt="example" src={product?.image}/></Col>
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
                            <Row> <ShoppingCartOutlined style={{fontSize: '24px'}} onClick={handleAddToCart}/><h3>Add To
                                Cart</h3></Row>
                        </Col>
                    </Row>
                </Col>


            </Row>

        )

}
export default ProductDetails;
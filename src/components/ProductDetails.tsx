import * as React from 'react';
import {Col, Form, notification, Row, Select} from 'antd';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Color, Product} from "./Types";
import { useNavigate } from 'react-router-dom';
import {CartProductType, useCart} from "./CartContext";






const ProductDetails: React.FC = () => {

    const {productId} = useParams();

    const [product, setProduct] = useState<Product>();

    const [selectedColorId, setSelectedColorId] = useState<string>(null);

    const navigate = useNavigate();

    const {cartItems, addToCart, removeFromCart} = useCart();

    const [api, contextHolder] = notification.useNotification();




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

    const productAddNotification = () => {
        api.open({
            message: 'Succes',
            description:
                'Product added to the cart successfully!',
        });
    };

    const handleAddToCart = () => {
        if (product && product.stock) {

            const selectedColor = product.colors.find(color => color.id === selectedColorId);

                const cartItem: CartProductType = {
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    image: product.image,
                    quantity: product.stock.quantity,
                    colorId: selectedColorId,
                    colorName: selectedColor.colorName
                };
                productAddNotification()
                addToCart(cartItem)
        }
    };


    const onChange = (value: string) => {
      setSelectedColorId(value)
    };


    return (
            <>
                {contextHolder}
            <Row justify={"center"}>
                <Col span={12} className={"product-col"}>
                    <Row className={"product-row"}> {product?.productName}</Row>
                    <Row className={"product-row"}>
                        <Col span={12}> <img width={400} height={400} alt="example" src={product?.image}/></Col>
                        <Col span={12}>
                            <Row> {product?.description}</Row>
                            <Row> ${product?.price} </Row>
                            <Row>
                                <Select
                                    showSearch
                                    placeholder="Select a color"
                                    optionFilterProp="children"
                                     onChange={onChange}
                                    options={product?.colors?.map(color => ({
                                        value: color.id,
                                        label: color.colorName
                                    }))}
                                />
                            </Row>
                            <Row> <ShoppingCartOutlined style={{fontSize: '24px'}} onClick={handleAddToCart}

                            /><h3>Add To
                                Cart</h3></Row>
                        </Col>
                    </Row>
                </Col>


            </Row>
            </>
        )

}
export default ProductDetails;
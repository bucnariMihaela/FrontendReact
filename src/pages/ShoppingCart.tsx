import * as React from 'react';
import {createContext, useEffect, useState} from "react";
import {Button, Col, Row} from "antd";
import {useParams} from "react-router-dom";

import {CartProductType, useCart} from "../components/CartContext";


const ShoppingCart: React.FC = () => {



    const [cartItem, setCartItem] = useState<CartProductType[]>([]);
    const { productId } = useParams();

    const { cartItems, addToCart, removeFromCart, updateProductQuantityInCart } = useCart();


    useEffect(() => {
        fetch(`http://localhost:8080/products/`+productId)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCartItem(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const handleQuantityChange = (itemId, newQuantity) => {
    updateProductQuantityInCart(itemId, newQuantity);
    };


    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    }


    return(
        <>
            <Row>
                {cartItems.map((item) => (
                    <Col key={item.id} span={24}>
                        <Row>
                            <Col span={6}>
                                <img src={item.image} alt={item.productName} width={200} height={200}/>
                            </Col>
                            <Col span={12}>
                                <Row><h3><b>Product Name:</b> {item.productName}</h3></Row>
                                <Row> <h3><b>Price:</b>{item.price}</h3></Row>
                            </Col>
                            <Col span={6}>
                                <Row> <h3><b>Quantity:</b>{item.quantity}</h3></Row>
                                <Button onClick={() => handleQuantityChange( item.id,item.quantity -1)}>-</Button>
                                <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                                <Button onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
            </>
    )
}

export default ShoppingCart;

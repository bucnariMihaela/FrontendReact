// @ts-ignore
import React, {createContext, useState, useContext, useEffect} from 'react';
import {Product} from "./Types";
import {useAuth} from "./AuthProvider";

//un produs in cosul de cumparaturi
export interface CartProductType {
    id: string
    productName: string
    price: number
    image: string
    colorId:string
    colorName: string
    quantity: number;
}

interface CartContextType {
    cartItems: CartProductType[];
    addToCart: (item: CartProductType) => void;
    removeFromCart: (itemId: string) => void;
    updateProductQuantityInCart: (itemId:string, newQuantity:number) => void;
}


const cartContextDefaultValues: CartContextType = {
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateProductQuantityInCart: () => {}
};

const CartContext = createContext<CartContextType>(cartContextDefaultValues);


export const useCart = () => useContext(CartContext);


export const CartProvider: React.FC = ({ children }) => {

    const { authState } = useAuth();

    const { userUsername } = authState;

    const [cartItems, setCartItems] = useState<CartProductType[]>(() => {
            const savedCartItems = localStorage.getItem(`cartItems_${userUsername}`);
            return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        cartItems && localStorage.setItem(`cartItems_${userUsername}`, JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
            const savedCartItems = localStorage.getItem(`cartItems_${userUsername}`);
            if (!savedCartItems) {
                localStorage.setItem(`cartItems_${userUsername}`, JSON.stringify([]));
                setCartItems([])
                return
            } else {
                setCartItems(JSON.parse(savedCartItems))
            }
    }, [authState, userUsername]);

    const addToCart = (item: CartProductType) => {
        setCartItems(currentCartItems => {
            const existingItem = currentCartItems.find(cartItem => cartItem.id === item.id && cartItem && cartItem.colorId === item.colorId);

            if (existingItem) {
                return currentCartItems.map(cartItem =>
                    cartItem.id === item.id && cartItem.colorId === item.colorId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Dacă produsul nu există în coș, adaugă-l
                return [...currentCartItems, { ...item, quantity: 1, colorId:item.colorId }];
            }
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(currentCartItems => {
            const filteredItems = currentCartItems.filter(cartItem => cartItem.id !== itemId)
            return filteredItems
        });
    };


    const updateProductQuantityInCart = (itemId:string, newQuantity: number) => {
        setCartItems(currentCartItems => {
            return currentCartItems.map(cartItem => {
                if (cartItem.id === itemId){
                    return {...cartItem, quantity: newQuantity}
                }
                return cartItem;
            });
        });
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,updateProductQuantityInCart }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContext;
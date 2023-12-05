import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Product from "./components/Product";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthProvider } from './components/AuthProvider';
import Logout from "./pages/Logout";
import ProductDetails from "./components/ProductDetails";
import AdminPageCreateProduct from "./pages/AdminPageCreateProduct";
import AdminPageAllProducts from "./pages/AdminPageAllProducts";
import AdminPageCreateColor from "./pages/AdminPageCreateColor";
import ShoppingCart from "./pages/ShoppingCart";
import {CartProvider} from "./components/CartContext";



export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="registration" element={<Registration/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="logout" element={<Logout/>} />

                    <Route path="products" element={<Product/>} />
                    <Route path="/productDetails/:productId" element={<ProductDetails />} />

                    <Route path="admin-create-product" element={<AdminPageCreateProduct/>} />
                    <Route path="admin-all-products" element={<AdminPageAllProducts/>} />
                    <Route path="admin-create-color" element={<AdminPageCreateColor/>} />
                    <Route path="/shopping-cart" element={<ShoppingCart/>} />

                </Route>
            </Routes>
        </BrowserRouter>
            </CartProvider>
            </AuthProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(<App />);

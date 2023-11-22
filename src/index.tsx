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
import AdminPage from "./pages/AdminPage";


export default function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="registration" element={<Registration/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="logout" element={<Logout/>} />

                    <Route path="products" element={<Product/>} />
                    <Route path="/productDetails/:productId" element={<ProductDetails />} />

                    <Route path="admin" element={<AdminPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
            </AuthProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(<App />);

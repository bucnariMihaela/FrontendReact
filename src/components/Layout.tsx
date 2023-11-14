import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Products</Link>
                    </li>
                    <li>
                        <Link to="/contact">Orders</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>

);
}

export default Layout
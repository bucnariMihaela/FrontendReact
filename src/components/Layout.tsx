import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import LayoutNavBar from "./LayoutNavBar";


const Layout: React.FC = () => {
    return (
        <>
            <LayoutNavBar />

            <Outlet />
        </>

);
}

export default Layout
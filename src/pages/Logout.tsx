
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../components/AuthProvider";
import {useEffect} from "react";


const Logout: React.FC = () => {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth();

    useEffect(() =>{
        onLogout()
    },[])

    const onLogout = () => {
        fetch('http://localhost:8080/log-out', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error('server response is not ok')
                }
                return res;
            })
            .then(json =>{
                setAuthState({ isAuthenticated: false, userRole: 'user' });
                navigate('/dashboard');
            })
    }

    return (
       <></>
    );

};

export default Logout;

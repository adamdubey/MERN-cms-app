import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({ user: null, token: '' });

    if(process.browser) {
        axios.defaults.baseURL = process.env.DEV_API_SERVER;
    } else {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    }

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            setAuth(JSON.parse(localStorage.getItem("auth")));
        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
        token: "",
        userInfo: null,
    });
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log(authState);
    }, [authState]);

    const setUserAuthInfo = ({ token, data }) => {

        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(data));

        setAuthState({
        token: token,
        userInfo: data,
        });

        setIsAuthenticated(true);
        
    };

    const logout = () => {

        // Remove token and user info from local storage
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
        }

        // Reset state variables
        setAuthState({
            token: "",
            userInfo: null,
        });
        setIsAuthenticated(false);
        router.push('/');
    };

    useEffect(() => {
        let tokenFromStorage = null;
        let userInfoFromStorage = null;

        if (typeof window !== "undefined") {
            tokenFromStorage = localStorage.getItem("token");
            userInfoFromStorage = localStorage.getItem("userInfo");
        }

        if (tokenFromStorage) {
        setAuthState({
            token: tokenFromStorage,
            userInfo: JSON.parse(userInfoFromStorage),
        });
        setIsAuthenticated(true);
        }
    }, []);

    return (
        <Provider
            value={{
                authState,
                setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
                isUserAuthenticated: () => isAuthenticated,
                logout: () => logout(),
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };
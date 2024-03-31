import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import axios from '@/utility/axiosConfig';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children, userId }) => {

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`reddit/user/${userId}`);
            return res.data;
        } catch (err) {
            throw new Error('Failed to fetch user data');
        }
    };

    const {
        data : userData,
        isLoading: isUserLoading,
        isError: userIsError,
        error: userError,
    } = useQuery(['userData', userId], () => fetchUserData());

    const value = {
        userData,
        isUserLoading,
        userIsError,
        userError,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
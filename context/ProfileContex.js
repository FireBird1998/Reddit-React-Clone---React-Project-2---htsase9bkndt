import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [user, setUser] = useState(null);

    const toggleButton = (buttonName) => {
        setActiveButton(activeButton === buttonName ? null : buttonName);
    };
    const contextValue = {
        activeButton,
        toggleButton,
        user,
        setUser,
    };

    // Return the provider with the context value
    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

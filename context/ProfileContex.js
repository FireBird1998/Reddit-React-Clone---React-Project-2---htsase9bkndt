import React, { createContext, useState } from 'react';


export const ProfileContext = createContext();

t
export const ProfileProvider = ({ children }) => {
    // State for profile data
    const [profile, setProfile] = useState(null);

    // Function to update the profile data
    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    };

    // Value object for the context
    const contextValue = {
        profile,
        updateProfile,
    };

    // Return the provider with the context value
    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};
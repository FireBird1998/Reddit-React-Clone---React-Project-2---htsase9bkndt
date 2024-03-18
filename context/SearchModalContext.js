"use client";   
import React from 'react';

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <ModalContext.Provider value={{ isOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};
import { createContext, useState } from "react";

export const FilterBarContext = createContext();


export const FilterBarProvider = ({ children }) => {
    const [activeButton, setActiveButton] = useState(null);

    const toggleButton = (buttonName) => {
        setActiveButton(activeButton === buttonName ? null : buttonName);
    };

    return (
        <FilterBarContext.Provider value={{ activeButton, toggleButton }}>
            {children}
        </FilterBarContext.Provider>
    );
};


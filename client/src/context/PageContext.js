import { createContext, useState, useReducer } from "react";

export const PageContext = createContext(null);

const PageReducer = (state, action) => {
    switch (action.type) {
        case "START_PAGE":
            return {
                page: 1
            };
        case "CURRENT_PAGE":
            return {
                page: action.payload
            };

        default: return state
    }
};

export const PageContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(PageReducer, { page: 1 });

    return <PageContext.Provider value={{ page: state.page, dispatch }}>
        {children}
    </PageContext.Provider>
}
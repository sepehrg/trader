import React, { useReducer } from "react";

const initialState = {
    user: null,
    stepWizard: 0,
    showErrorCaptcha: false,
    captchaValue: "",
    clientId: "",
    regionTypes: [],
    typeOtpEnum: 0,
    kycUserInfo: {},
    userSavedStepData: {},
    isLoding: false
};

const getInitialState = () => {
    const prevData = window.localStorage.getItem("initialState");

    if (prevData) {
        const prevState = JSON.parse(prevData);
        let state = { ...initialState, ...prevState };
        state.showErrorCaptcha = false;
        state.captchaValue = "";
        state.isLoding = false;
        return state;
    }
    return initialState;
};

const contextReducer = (state, action) => {
    let newState = { ...state };
    if (action.type === "user") {
        newState.user = action.payload;
        newState.userSavedStepData = {};
        newState.kycUserInfo = {};
        newState.typeOtpEnum = 0;
        newState.stepWizard = 0;
        newState.isLoding = false;
    }
    else {
        newState[action.type] = action.payload;
    }
    window.localStorage.setItem("initialState", JSON.stringify(newState));
    return newState;
};

const AppContext = React.createContext(initialState);

const AppProvider = props => {
    const [state, dispatch] = useReducer(contextReducer, getInitialState());
    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;
export { AppProvider };


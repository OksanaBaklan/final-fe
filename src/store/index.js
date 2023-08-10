
import { legacy_createStore } from "redux";

export const typeReducer = (state = { colorstate: "#27CCa7" }, action) => {
    
    switch (action.type) {
        case "GREEN":
            return { ...state, colorstate: "#27CCa7" }; 
        case "RED":
            return { ...state, colorstate: "#ff6596" };
        default:
            return state;
    }

}

const storeColor = legacy_createStore(typeReducer);

export default storeColor;


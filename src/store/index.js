
import { legacy_createStore } from "redux";

const typeReducer = (state = { colorstate: "#27CCa7" }, action) => {
    
    switch (action.type) {
        case "GREEN":
            return { ...state, colorstate: "#27CCa7" }; 
        case "RED":
            return { ...state, colorstate: "#ff6596" };
        default:
            return state;
    }

}

const store = legacy_createStore(typeReducer);

export default store;


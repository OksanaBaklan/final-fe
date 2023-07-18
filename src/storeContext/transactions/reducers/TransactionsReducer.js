/** @format */

export const types = {
  ADD_TRANSACTION: "addTransaction",
  GET_TRANSACTION: "deleteTransaction",
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_TRANSACTION: {
      console.log("action", action);
      console.log("state", state);

      return [...state, action.payload];
    }
    case types.GET_TRANSACTION: {
      return state.filter((item) => item.taskId !== action.payload);
    }
    default: {
      return state;
    }
  }
};
export const initialState = [];

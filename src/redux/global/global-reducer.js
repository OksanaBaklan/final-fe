import { combineReducers, createReducer } from '@reduxjs/toolkit';

import {
  openModal,
  closeModal,
  openEditModal,
  closeEditModal,
  openModalAvatar,
  closeModalAvatar,
  openModalLogOut,
  closeModalLogOut,
  toggleTheme,
} from './global-action';

const setTrue = () => true;
const setFalse = () => false;

const modalTransaction = createReducer(false, {
  [openModal]: setTrue,
  [closeModal]: setFalse,
});

const modalEditTransaction = createReducer(false, {
  [openEditModal]: setTrue,
  [closeEditModal]: setFalse,
});

const modalAvatar = createReducer(false, {
  [openModalAvatar]: setTrue,
  [closeModalAvatar]: setFalse,
});

const modalLogOut = createReducer(false, {
  [openModalLogOut]: setTrue,
  [closeModalLogOut]: setFalse,
});

const initialState = {
  isDarkMode: true,
  // checking mode from local storage, if falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise true
  // isDarkMode: !!JSON.parse(localStorage.getItem("darkmode")),
};

const toggleThemeReducer = createReducer(initialState, {
  [toggleTheme]: state => {
    localStorage.setItem('darkmode', JSON.stringify(!state.isDarkMode)); // Update local storage
    return { ...state, isDarkMode: !state.isDarkMode };
  },
});

export default combineReducers({
  modalTransaction,
  modalEditTransaction,
  modalAvatar,
  modalLogOut,
  toggleThemeReducer,
});

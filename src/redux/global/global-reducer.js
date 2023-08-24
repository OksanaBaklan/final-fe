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
  toggleTheme
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

const toggleThemeReducer = createReducer({
  darkTheme: false,
},{
  
[toggleTheme]:(state, {payload})=>{
  return { darkTheme: !payload.darkTheme };
},})

export default combineReducers({
  modalTransaction,
  modalEditTransaction,
  modalAvatar,
  modalLogOut,
  toggleThemeReducer
});

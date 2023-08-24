import { createAction } from '@reduxjs/toolkit';

const openModal = createAction('global/openModal');
const closeModal = createAction('global/closeModal');
const openEditModal = createAction('global/openEditModal');
const closeEditModal = createAction('global/closeEditModal');
const openModalAvatar = createAction('global/openModalAvatar');
const closeModalAvatar = createAction('global/closeEModalAvatar');
const openModalLogOut = createAction('global/openModalLogOut');
const closeModalLogOut = createAction('global/closeModalLogOut');

const toggleTheme = createAction('global/toggleTheme')

export {
  openModalLogOut,
  closeModalLogOut,
  openModal,
  closeModal,
  openEditModal,
  closeEditModal,
  openModalAvatar,
  closeModalAvatar,
  toggleTheme
};

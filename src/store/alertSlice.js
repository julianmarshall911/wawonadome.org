import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, resetPassword } from './authSlice';
import { fetchUserData } from './dataSlice';

const show = (state, message, variant) => {
  state.open = true;
  state.message = message;
  state.variant = variant;
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: { open: false, message: '', variant: 'success' },
  reducers: {
    showAlert: {
      reducer: (state, { payload }) =>
        show(state, payload.message, payload.variant),
      prepare: (message, variant = 'success') => ({
        payload: { message, variant },
      }),
    },
    closeAlert(state) {
      state.open = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, state =>
        show(state, 'Successfully logged in', 'success'),
      )
      .addCase(resetPassword.fulfilled, (state, { payload }) =>
        show(state, `Email sent to ${payload}`, 'success'),
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          logout.rejected,
          resetPassword.rejected,
          fetchUserData.rejected,
        ),
        (state, { error }) => show(state, error.message, 'error'),
      );
  },
  selectors: {
    selectAlert: state => state,
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export const { selectAlert } = alertSlice.selectors;

export default alertSlice;

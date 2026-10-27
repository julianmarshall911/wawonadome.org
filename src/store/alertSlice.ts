import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, resetPassword } from './authSlice';
import { fetchUserData } from './dataSlice';

export type AlertVariant = 'success' | 'error';

interface AlertState {
  open: boolean;
  message: string;
  variant: AlertVariant;
}

const show = (state: AlertState, message: string, variant: AlertVariant) => {
  state.open = true;
  state.message = message;
  state.variant = variant;
};

const initialState: AlertState = {
  open: false,
  message: '',
  variant: 'success',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: {
      reducer: (
        state,
        { payload }: { payload: { message: string; variant: AlertVariant } },
      ) => show(state, payload.message, payload.variant),
      prepare: (message: string, variant: AlertVariant = 'success') => ({
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
        (state, { error }) =>
          show(state, error.message ?? 'Something went wrong', 'error'),
      );
  },
  selectors: {
    selectAlert: state => state,
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export const { selectAlert } = alertSlice.selectors;

export default alertSlice;

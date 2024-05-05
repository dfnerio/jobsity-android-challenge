import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SecurityState {
  isAuthorized: boolean;
  isPinEnabled: boolean;
  pin: string | null;
}

const initialState: SecurityState = {
  isAuthorized: false,
  isPinEnabled: false,
  pin: null,
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setIsPinEnabled: (state, action: PayloadAction<boolean>) => {
      state.isPinEnabled = action.payload;
    },
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },
  },
});

export type SecurityReducer = ReturnType<typeof securitySlice.reducer>;

export const { setIsAuthorized, setIsPinEnabled, setPin } =
  securitySlice.actions;

export default securitySlice.reducer;

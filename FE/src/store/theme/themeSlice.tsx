import themConfig from '@/configs/theme.config';
import { mapBackendTheme } from '@/utils/themeMapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: any;
}

const initialState: ThemeState = {
  theme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<any>) => {
      state.theme = mapBackendTheme(action.payload);
    },
    resetTheme: (state) => {
      state.theme = themConfig;
    },
  },
});

export const { setTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface virtuosoWidthState {
  name: number;
  color: number;
  total: number;
  loading: boolean;
  cacheName: Record<string, number>;
  cacheColor: Record<string, number>;
}

const initialState: virtuosoWidthState = {
  name: 0,
  color: 0,
  total: 0,
  cacheName: {},
  cacheColor: {},
  loading: true,
};

interface SetWidth {
  row: number;
  color?: number;
  name?: number;
  column: number;
  total?: number;
}

export const virtuosoWidthSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<SetWidth>) => {
      const { total, row, column, name, color } = action.payload;
      if (total) {
        state.total = total;
      }

      const key = `${row}-${column}`;

      if (color) {
        state.cacheColor[key] = color;
      }

      if (name) {
        state.cacheName[key] = name;
      }

      if (
        Object.keys(state.cacheName).length === state.total &&
        Object.keys(state.cacheColor).length === state.total
      ) {
        state.color = Math.max(...Object.values(state.cacheColor));
        state.name = Math.max(...Object.values(state.cacheName));
        state.loading = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWidth } = virtuosoWidthSlice.actions;

export default virtuosoWidthSlice.reducer;

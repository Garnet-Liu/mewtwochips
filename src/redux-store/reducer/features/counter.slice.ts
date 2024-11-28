import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { apiFetchRequest } from "@/lib/fetch-request";

export interface CounterState {
  value: number;
  loading: boolean;
}

const initialState: CounterState = {
  value: 0,
  loading: false,
};

// First, create the thunk
export const fetchCounter = createAsyncThunk(
  "counter/api",
  async (p: { count: number; now: number }, { rejectWithValue }) => {
    try {
      const response = await apiFetchRequest<{
        count: number;
      }>(`${window.location.origin}/api/features/counter?count=${p.count}&now=${p.now}`);
      return response.count;
    } catch (e) {
      console.log(e);
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(p.count);
    }
  },
);

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value = Math.max(0, state.value - 1);
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log("incrementByAmount", action.payload);
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCounter.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("fulfilled");
      state.value = action.payload;
    });
    builder.addCase(fetchCounter.pending, (state) => {
      // Add user to the state array
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(fetchCounter.rejected, () => {
      // Add user to the state array
      console.log("rejected");
    });
    builder.addMatcher(fetchCounter.settled, (state) => {
      console.log("settled");
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { init, increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

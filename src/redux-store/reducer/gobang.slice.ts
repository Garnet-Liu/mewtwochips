import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Point } from "@/types/gobang/board.type";
import { EPiece, EPlayer } from "@/types/gobang/role.type";
import { PlayType, StartType } from "@/types/gobang/bridge.type";
import { end, play, reversal, searchWinnerPath, start, undo } from "@/services/gobang";

export interface IGobangState {
  first: EPlayer;
  player: EPiece;
  winner: EPiece;
  winPath: Point[];
  loading: boolean;
  board: [number, number, EPiece][];
}

const initialState: IGobangState = {
  first: EPlayer.HUMAN,
  player: EPiece.EMPTY,
  winner: EPiece.EMPTY,
  loading: false,
  winPath: [],
  board: [],
};

export const startGame = createAsyncThunk(
  "gobang/start",
  async ({ first, depth }: StartType["payload"]) => {
    return await start(first, depth);
  },
);

export const playGame = createAsyncThunk(
  "gobang/play",
  async ({ position }: PlayType["payload"]) => {
    return await play(position);
  },
);

export const undoGame = createAsyncThunk("gobang/undo", async () => {
  return await undo();
});

export const endGame = createAsyncThunk("gobang/end", async () => {
  return await end();
});

const gobangSlice = createSlice({
  name: "gobang",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startGame.pending, (_, action) => {
      const { first } = action.meta.arg;
      return {
        ...initialState,
        loading: true,
        player: EPiece.BLACK,
        first: first ? EPlayer.HUMAN : EPlayer.COMPUTER,
      };
    });
    builder.addCase(startGame.fulfilled, (state, { payload }) => {
      console.log("startGame fulfilled payload:", payload);
      const { currentPlayer, move } = payload;
      console.log("move", move);
      if (move) {
        state.board.push([move[0], move[1], reversal(currentPlayer)]);
      }
      state.loading = false;
    });

    builder.addCase(playGame.pending, (state, action) => {
      console.log("playGame action:", action);
      const { position } = action.meta.arg;
      console.log("playGame action position:", position);
      state.board.push([...position, state.player]);
      state.player = reversal(state.player);
      state.loading = true;
    });
    builder.addCase(playGame.fulfilled, (state, { payload }) => {
      console.log("playGame fulfilled", payload);
      const { currentPlayer, move, winner } = payload;
      state.player = currentPlayer;

      if (move) {
        const [x, y] = move;
        state.board.push([x, y, reversal(currentPlayer)]);
        state.winner = winner || state.winner;
        if (state.winner !== EPiece.EMPTY) {
          state.player = EPiece.EMPTY;
          state.winPath = searchWinnerPath(move, state.board, reversal(currentPlayer));
        }
      }
      state.loading = false;
    });

    builder.addCase(undoGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(undoGame.fulfilled, (state, action) => {
      console.log("undoMove fulfilled", action);
      state.board.pop();
      state.board.pop();
      state.loading = false;
    });

    builder.addCase(endGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(endGame.fulfilled, (_, action) => {
      console.log("endGame fulfilled", action);
      return initialState;
    });
  },
});

export default gobangSlice.reducer;

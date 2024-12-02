import {
  EndType,
  EventResType,
  EventType,
  EWorkerAction,
  PlayType,
  Point,
  StartType,
  UndoType,
} from "@/types/gobang";
import { Board } from "./board";
import { cache_hits, minmax } from "./minmax";
import { getBoardData } from "@/services/gobang/utils";

onmessage = function (event: MessageEvent<EventType>) {
  const { action, payload } = event.data;
  let res: EventResType["payload"] | null = null;
  switch (action) {
    case EWorkerAction.START:
      res = start(payload);
      break;
    case EWorkerAction.PLAY:
      res = play(payload);
      break;
    case EWorkerAction.UNDO:
      res = undo(payload);
      break;
    case EWorkerAction.END:
      res = end(payload);
      break;
    default:
      break;
  }
  postMessage({ action, payload: res });
};

let board = new Board();

const start = (payload: StartType["payload"]): EventResType["payload"] => {
  console.log("start ===>", payload);
  const { depth, first } = payload;
  let move: Point | undefined = undefined;
  let score: number | undefined = undefined;
  let bestPath: Point[] | undefined = undefined;
  board = new Board(depth);
  if (!first) {
    [score, move, bestPath] = minmax(board, board.role, depth);
    console.log("move", move);
    console.log("cache_hits =>", cache_hits);
    if (move) {
      board.put(move[0], move[1]);
    }
  }
  return getBoardData(board, score, move, bestPath);
};

const play = (payload: PlayType["payload"]): EventResType["payload"] => {
  console.log("play ===>", payload);
  const { position } = payload;
  let move: Point | undefined = undefined;
  let score: number | undefined = undefined;
  let bestPath: Point[] | undefined = undefined;
  try {
    board.put(position[1], position[0]);
  } catch (e) {
    console.log(e);
  }
  if (!board.isGameOver()) {
    [score, move, bestPath] = minmax(board, board.role, board.depth);
    console.log("cache_hits =>", cache_hits);

    if (move) {
      board.put(move[0], move[1]);
    }
  }
  console.log(board.display());
  return getBoardData(board, score, move, bestPath);
};

const undo = (payload: UndoType["payload"]): EventResType["payload"] => {
  console.log("undo ===>", payload);
  return getBoardData(board);
};

const end = (payload: EndType["payload"]): EventResType["payload"] => {
  console.log("end ===>", payload);
  board.undo();
  board.undo();
  return getBoardData(board);
};

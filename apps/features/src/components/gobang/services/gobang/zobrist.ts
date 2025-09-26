/* global BigInt */
import { BOARD_SIZE } from "@/components/gobang/services/gobang/config";
import { EPiece } from "@/components/gobang/types/role.type";

export class Zobrist {
  size = BOARD_SIZE;
  hash = BigInt(0);
  zobristTable = this.initializeZobristTable(this.size);

  togglePiece(x: number, y: number, role: EPiece) {
    if (this.zobristTable[y]?.[x]?.[role]) {
      this.hash ^= this.zobristTable[y][x][role]!;
    }
  }

  getHash() {
    return this.hash;
  }

  private randomBitString(length: number) {
    let str = "0b";
    for (let i = 0; i < length; i++) {
      str += Math.round(Math.random()).toString();
    }
    return str;
  }

  private initializeZobristTable(size = BOARD_SIZE) {
    const table: Array<Array<Record<string, bigint>>> = [];
    for (let y = 0; y < size; y++) {
      table[y] = [];
      for (let x = 0; x < size; x++) {
        table[y]![x] = {
          [EPiece.BLACK]: BigInt(this.randomBitString(64)), // black
          [EPiece.WHITE]: BigInt(this.randomBitString(64)), // white
        };
      }
    }
    return table;
  }
}

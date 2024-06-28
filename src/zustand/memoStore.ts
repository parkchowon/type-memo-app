import { v4 } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MemosType } from "../types/MemoType";

type Memo = {
  memos: MemosType[];
  createMemo: (newMemo: MemosType) => void;
  deleteMemo: (id: string) => void;
  selectMemo: (memo: MemosType) => void;
  editMemo: (newMemo: Pick<MemosType, "id" | "memo">) => void;
};

const today = new Date();
const date = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()} ${today.getHours()} ${today.getMinutes()}`;

const initId = v4();

export const useMemoStore = create<Memo>()(
  immer((set) => ({
    memos: [
      {
        id: initId,
        memo: "",
        date: date,
        isClicked: true,
      },
    ],
    createMemo: (newMemo) => {
      set((prevState) => {
        prevState.memos.push(newMemo);
        prevState.memos.map((memo) => {
          if (newMemo.id === memo.id) {
            return (memo.isClicked = true);
          }
          memo.isClicked = false;
        });
      });
    },
    deleteMemo: (id) => {
      set((prevState) => {
        prevState.memos = prevState.memos.filter((memo) => memo.id !== id);
        prevState.memos[0].isClicked = true;
      });
    },
    selectMemo: (selectedMemo) => {
      set((prevState) => {
        prevState.memos.map((memo) => {
          if (selectedMemo.id === memo.id) {
            return (memo.isClicked = true);
          }
          memo.isClicked = false;
        });
      });
    },
    editMemo: (newMemo) => {
      set((prevState) => {
        prevState.memos.map((memo) => {
          if (memo.id === newMemo.id) {
            return (memo.memo = newMemo.memo);
          }
        });
      });
    },
  }))
);

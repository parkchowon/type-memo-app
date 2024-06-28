import { MemosType } from "../../types/MemoType";
import { useMemoStore } from "../../zustand/memoStore";

type MemoProps = {
  memo: MemosType;
};

function MemoItem({ memo }: MemoProps): JSX.Element {
  const { selectMemo } = useMemoStore();

  const timeArr = memo.date.split(" ");

  const handleMemoItemClick = () => {
    selectMemo(memo);
  };

  return (
    <li
      className={`${
        memo.isClicked ? "bg-sky-200" : "bg-white"
      } rounded-[4px] px-6 py-3 box-border cursor-pointer h-max`}
      onClick={handleMemoItemClick}
    >
      <h6 className="text-[13px] font-bold line-clamp-1">
        {memo.memo === "" ? "새로운 메모" : memo.memo}
      </h6>
      <p className="text-[12px]">
        {+timeArr[3] > 11 ? "오후" : "오전"}
        {` ${timeArr[3]}:${timeArr[4]}`}
      </p>
    </li>
  );
}

export default MemoItem;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { useMemoStore } from "../../zustand/memoStore";
import MemoItem from "../MemoItem";

function MemoList() {
  const { memos, createMemo, deleteMemo } = useMemoStore();

  const handleAddMemo = () => {
    const today = new Date();
    const date = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()} ${today.getHours()} ${today.getMinutes()}`;

    createMemo({
      id: v4(),
      memo: "",
      date: date,
      isClicked: true,
    });
  };

  const handleDeleteMemo = () => {
    const clickMemo = memos.filter((memo) => memo.isClicked === true)[0];
    if (memos.length > 1) {
      deleteMemo(clickMemo.id);
    } else {
      toast.error("메모를 하나 이상 남겨야합니다.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-[240px] h-fix border-r">
      <div className="h-[50px] border-b flex flex-row justify-around items-center">
        <button
          className="text-[13px] text-gray-400 hover:text-black hover:font-bold "
          onClick={handleAddMemo}
        >
          새 메모 작성하기
        </button>
        <button
          className="text-[13px] text-gray-400 hover:text-black hover:font-bold "
          onClick={handleDeleteMemo}
        >
          삭제
        </button>
      </div>
      <ul className="px-3 py-5 flex flex-col gap-2 h-[450px] box-border overflow-y-auto">
        {memos.map((memo) => {
          return <MemoItem key={memo.id} memo={memo} />;
        })}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default MemoList;

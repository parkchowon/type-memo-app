import { useEffect, useState } from "react";
import { MemosType } from "../../types/MemoType";
import { useMemoStore } from "../../zustand/memoStore";

function MemoPad() {
  const [padTime, setPadTime] = useState<string[]>([]);
  const [padMemo, setPadMemo] = useState<MemosType>();
  const [memoText, setMemoText] = useState<string>("");
  const { memos, editMemo } = useMemoStore();

  useEffect(() => {
    const clickMemo = memos.find((memo) => {
      return memo.isClicked === true;
    });

    if (clickMemo) {
      setMemoText(clickMemo.memo);
      setPadMemo(clickMemo);
      setPadTime(clickMemo.date.split(" "));
    }
  }, [memos]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!padMemo) return;
      const currentId = padMemo.id;
      editMemo({
        id: currentId,
        memo: memoText,
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [memoText]);

  return (
    <div className="flex flex-col flex-grow p-5">
      <p className="text-[10px] text-center pb-6 text-gray-400">{`${padTime[0]}년 ${padTime[1]}월 ${padTime[2]}일 ${padTime[3]}:${padTime[4]}`}</p>
      <textarea
        className="flex-grow resize-none focus:outline-none"
        onChange={(e) => handleTextChange(e)}
        value={memoText}
      ></textarea>
    </div>
  );
}

export default MemoPad;

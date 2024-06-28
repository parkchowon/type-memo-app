import MemoList from "./components/MemoList";
import MemoPad from "./components/MemoPad";

function App() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-row h-fit w-[1024px] shadow-lg rounded-xl border-solid border">
        <MemoList />
        <MemoPad />
      </div>
    </div>
  );
}

export default App;

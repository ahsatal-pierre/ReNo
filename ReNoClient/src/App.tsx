import { useState } from "react";
import "./App.css";
import Hello from "./hello";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Hello />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;

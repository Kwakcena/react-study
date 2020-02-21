import React, { useState } from "react";
import Info from "./ch08/Info";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "숨기기" : "보이기"}
      </button>
      <hr />
      {/* visible이 true면 <Info /> 실행, false면 X */}
      {visible && <Info />}
    </div>
  );
};

export default App;

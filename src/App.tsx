import React from "react";

import HomePage from "./pages/home-page/HomePage";
import SticktButtons from "./components/sticky-buttons/SticktButtons";
import GamePage, { useStartGameValue } from "./pages/game-page/GamePage";

function App() {
  // const startGame = useStartGameValue();

  return (
    <div className="w-full overflow-hidden">
      <GamePage />
      {/* <HomePage /> */}
      <SticktButtons />
    </div>
  );
}

export default App;

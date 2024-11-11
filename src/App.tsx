import { useEffect, useState } from "react";

import HomePage from "./pages/home-page/HomePage";
import SticktButtons from "./components/sticky-buttons/SticktButtons";
import GamePage, { useStartGameValue } from "./pages/game-page/GamePage";

function App() {
  const startGame = useStartGameValue();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth < 1440) {
    return (
      <div className="w-full h-screen flex flex-col gap-10 text-center items-center justify-center">
        <h1 className="text-5xl font-bold">Oops!</h1>
        <div className="text-xl w-4/5">
          This game is not supported on small screen devices. Please use a large
          desktop device.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {startGame ? <GamePage /> : <HomePage />}
      <SticktButtons />
    </div>
  );
}

export default App;

import React from "react";

import HomePage from "./pages/home-page/HomePage";
import SticktButtons from "./components/sticky-buttons/SticktButtons";

function App() {
  return (
    <div className="w-full overflow-hidden">
      <HomePage />
      <SticktButtons />
    </div>
  );
}

export default App;

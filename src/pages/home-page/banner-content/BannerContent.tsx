import React, { useState } from "react";
import Button from "../../../components/button/Button";
import ChooseLevelPopup from "../choose-level-popup/ChooseLevelPopup";

export default function BannerContent() {
  const [openChooseLevel, setOpenChooseLevel] = useState(false);

  return (
    <div className="relative z-50 h-1/2 flex items-center justify-start gap-[15vh] flex-col">
      <h1 className="font-title text-8xl" id="game-title">
        ZOO CARDS
      </h1>
      <div>
        <Button
          className="animate-bounce btn-play"
          onClick={() => setOpenChooseLevel(true)}
        >
          Play Now!
        </Button>
      </div>
      <ChooseLevelPopup
        open={openChooseLevel}
        onClose={() => setOpenChooseLevel(false)}
      />
    </div>
  );
}

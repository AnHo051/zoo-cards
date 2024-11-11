import Button from "../../../components/button/Button";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { ReactComponent as BackIcon } from "../../../images/icons/back.svg";
import GameRule from "../game-rule/GameRule";
import ChooseLevelContent from "./ChooseLevelContent";
import { GameCardDataType } from "../../game-page/game-card/GameCard";
import { useEffect } from "react";
import { pickRandomCards } from "../../../utils/functions";
import { GameLevel } from "../../game-page/GamePage";
import Popup from "../../../components/popup/Popup";

export const levelAtom = atom<GameLevel | null>(null);
export const useLevelValue = () => useAtomValue(levelAtom);

export const gameDataAtome = atom<GameCardDataType[]>([]);
export const useGameDataValue = () => useAtomValue(gameDataAtome);

interface ChooseLevelPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ChooseLevelPopup({
  open,
  onClose,
}: ChooseLevelPopupProps) {
  const [level, setLevel] = useAtom(levelAtom);
  const setGameData = useSetAtom(gameDataAtome);

  useEffect(() => {
    if (level) {
      const data = pickRandomCards(level);
      setGameData(data);
    }
  }, [level]);

  useGSAP(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eyes = document.querySelectorAll("#popup-eye");
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        const distance = Math.min(
          10,
          Math.hypot(event.clientX - eyeX, event.clientY - eyeY) / 10
        );
        gsap.to(eye, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          duration: 0.1,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  if (!open) return null;

  return (
    <Popup
      open={open}
      onClose={() => {
        onClose();
        setLevel(null);
      }}
    >
      {level ? (
        <>
          <div className="absolute top-3 left-4 3xl:top-4 3xl:left-5 z-6">
            <Button variant="icon" onClick={() => setLevel(null)}>
              <BackIcon />
            </Button>
          </div>
          <GameRule onClose={onClose} />
        </>
      ) : (
        <ChooseLevelContent />
      )}
    </Popup>
  );
}

import { ReactComponent as Penguin } from "../../../images/banner/penguin.svg";
import { ReactComponent as Elk } from "../../../images/banner/elk.svg";
import { ReactComponent as Lion } from "../../../images/banner/lion.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSetAtom } from "jotai";
import { levelAtom } from "./ChooseLevelPopup";
import { GameLevel } from "../../game-page/GamePage";

gsap.registerPlugin(SplitText);

interface GameLevelDataType {
  id: GameLevel;
  name: string;
  bonusPoint: number;
}

export const LEVEL: GameLevelDataType[] = [
  { id: "easy", name: "NEWBIE", bonusPoint: 0 },
  { id: "medium", name: "INTERMEDIATE", bonusPoint: 50 },
  { id: "hard", name: "EXPERT", bonusPoint: 100 },
];

interface ChooseLevelContentProps {}
let runAimation = true;
export default function ChooseLevelContent(props: ChooseLevelContentProps) {
  const setLevel = useSetAtom(levelAtom);

  useGSAP(() => {
    if (runAimation) {
      const splitTitle = new SplitText("#choose-level-title", {
        type: "chars",
      });
      const tl = gsap.timeline();
      tl.from(splitTitle.chars, {
        duration: 0.3,
        autoAlpha: 0,
        stagger: 0.05,
        scale: 0.5,
      }).from("#choose-level-item", {
        duration: 0.5,
        autoAlpha: 0,
        y: 70,
        onComplete: () => {
          runAimation = false;
        },
      });
    }
  });

  return (
    <div className="flex w-full pt-12 3xl:pt-20 pb-10 px-10 flex-col gap-16 3xl:gap-24 items-center h-full relative z-4">
      <h2
        id="choose-level-title"
        className="font-title text-[2.75rem] 3xl:text-6xl"
      >
        CHOOSE YOUR LEVEL
      </h2>

      <div
        id="choose-level-item"
        className="w-full flex items-center justify-evenly"
      >
        <div
          onClick={() => setLevel(LEVEL[0].id)}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Penguin className="w-1/2 h-auto" />
          <div className="text-2xl 3xl:text-4xl font-button">
            {LEVEL[0].name}
          </div>
        </div>
        <div
          onClick={() => setLevel(LEVEL[1].id)}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Elk className="w-1/2 h-auto" />
          <div className="text-2xl 3xl:text-4xl font-button">
            {LEVEL[1].name}
          </div>
        </div>
        <div
          onClick={() => setLevel(LEVEL[2].id)}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Lion className="w-1/2 h-auto ml-3" />
          <div className="text-2xl 3xl:text-4xl font-button">
            {LEVEL[2].name}
          </div>
        </div>
      </div>
    </div>
  );
}

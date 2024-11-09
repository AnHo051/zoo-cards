import { ReactComponent as Penguin } from "../../../images/penguin.svg";
import { ReactComponent as Elk } from "../../../images/elk.svg";
import { ReactComponent as Lion } from "../../../images/lion.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export const LEVEL = ["NEWBIE", "INTERMEDIATE", "EXPERT"];

interface ChooseLevelContentProps {
  setLevel: (level: string) => void;
}
let runAimation = true;
export default function ChooseLevelContent(props: ChooseLevelContentProps) {
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
          onClick={() => props.setLevel(LEVEL[0])}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Penguin className="w-1/2 h-auto" />
          <div className="text-2xl 3xl:text-4xl font-button">{LEVEL[0]}</div>
        </div>
        <div
          onClick={() => props.setLevel(LEVEL[1])}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Elk className="w-1/2 h-auto" />
          <div className="text-2xl 3xl:text-4xl font-button">{LEVEL[1]}</div>
        </div>
        <div
          onClick={() => props.setLevel(LEVEL[2])}
          className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
        >
          <Lion className="w-1/2 h-auto ml-3" />
          <div className="text-2xl 3xl:text-4xl font-button">{LEVEL[2]}</div>
        </div>
      </div>
    </div>
  );
}

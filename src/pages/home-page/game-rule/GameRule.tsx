import styles from "./GameRule.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../../components/button/Button";
import { useRef } from "react";
import { useSetAtom } from "jotai";
import { startGameAtom } from "../../game-page/GamePage";

gsap.registerPlugin(SplitText);

let runAimation = true;

export default function GameRule() {
  const root = useRef(null);
  const setStartGame = useSetAtom(startGameAtom);

  useGSAP(() => {
    if (runAimation) {
      const splitTitle = new SplitText("#game-title", { type: "chars" });
      const splitContent = new SplitText("#game-rule", { type: "words" });

      const tl = gsap.timeline();

      tl.from(splitTitle.chars, {
        duration: 0.3,
        autoAlpha: 0,
        stagger: 0.05,
        scale: 0.5,
      })
        .from(splitContent.words, {
          duration: 0.3,
          autoAlpha: 0,
          stagger: 0.03,
        })
        .fromTo(
          "#play-button",
          { opacity: 0, marginTop: 40 },
          {
            duration: 0.3,
            opacity: 1,
            marginTop: 0,
            onComplete: () => {
              runAimation = false;
            },
          }
        );
    }
  }, [{ container: root }]);

  return (
    <div
      ref={root}
      className="flex w-full pt-12 3xl:pt-20 pb-10 px-10 flex-col gap-3 3xl:gap-10 items-center h-full relative z-4"
    >
      <div className={styles["overlay"]}></div>
      <h2 className="font-title text-[2.75rem] 3xl:text-6xl" id="game-title">
        GAME RULES
      </h2>
      <div
        id="game-rule"
        className="w-4/5 font-bold text-2xl 3xl:text-3xl text-white [&>p]:py-1.5"
      >
        <p>
          In Zoo Cards, the player flips two cards at a time to find matching
          pairs, with a limit of 5 wrong attempts.
        </p>
        <p>
          Each incorrect match reduces the remaining attempts. The game ends
          when all pairs are matched or the player reaches the 5-mistake limit.
        </p>
        <p>
          The final score is based on the time taken and remaining attempts.
        </p>
      </div>
      <Button
        id="play-button"
        className={styles["play-btn"]}
        onClick={() => setStartGame(true)}
      >
        Start Game!
      </Button>
    </div>
  );
}

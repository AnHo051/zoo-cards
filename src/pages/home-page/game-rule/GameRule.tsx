import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../../components/button/Button";
import { useRef } from "react";
import { useSetAtom } from "jotai";
import { startGameAtom } from "../../game-page/GamePage";
import { playMusicAtom } from "../HomePage";

// gsap.registerPlugin(SplitText);

let runAimation = true;

interface GameRuleProps {
  onClose: () => void;
}

export default function GameRule({ onClose }: GameRuleProps) {
  const root = useRef(null);
  const setStartGame = useSetAtom(startGameAtom);
  const setPlayMusic = useSetAtom(playMusicAtom);

  useGSAP(() => {
    if (runAimation) {
      // const splitTitle = new SplitText("#game-title", { type: "chars" });
      // const splitContent = new SplitText("#game-rule", { type: "words" });

      // from(splitTitle.chars, {
      //   duration: 0.3,
      //   autoAlpha: 0,
      //   stagger: 0.05,
      //   scale: 0.5,
      // })
      //   .from(splitContent.words, {
      //     duration: 0.3,
      //     autoAlpha: 0,
      //     stagger: 0.03,
      //   })

      const tl = gsap.timeline();

      tl.from("#game-title", {
        duration: 0.5,
        autoAlpha: 0,
        y: 30,
      })
        .from("#game-rule", {
          duration: 0.5,
          autoAlpha: 0,
          y: 40,
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
      <h2 className="font-title text-[2.75rem] 3xl:text-6xl" id="game-title">
        GAME RULES
      </h2>
      <div
        id="game-rule"
        className="w-4/5 font-bold text-2xl 3xl:text-3xl text-black [&>p]:py-1.5"
      >
        <p>
          In Zoo Cards, players flip two cards at a time to find matching pairs,
          with a maximum of 10 mistakes and a time limit of 30 minutes.
        </p>
        <p>
          The game ends when all pairs are matched, the mistake limit is
          reached, or time runs out.
        </p>
        <p>
          Scores are based on time taken and remaining attempts, rewarding speed
          and accuracy.
        </p>
      </div>
      <Button
        id="play-button"
        onClick={() => {
          onClose();
          setStartGame(true);
          setPlayMusic(false);
        }}
      >
        Start Game!
      </Button>
    </div>
  );
}

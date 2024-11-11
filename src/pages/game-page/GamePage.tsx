import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import GameBg from "../../images/banner/home-bg.jpg";
import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";
import correctSound from "../../audio/Good.mp3";
import wrongSound from "../../audio/Quack.mp3";
import timeoutSound from "../../audio/Fail-Titanic.mp3";
import failSound from "../../audio/Angels-Singing.mp3";
import newRecordSound from "../../audio/Wow.mp3";
import passSound from "../../audio/Yeehaw.mp3";
import gsap from "gsap";

import GameCard from "./game-card/GameCard";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import GameInfo, { endGameAtom, useTimeSpendValue } from "./game-info/GameInfo";
import {
  gameDataAtome,
  levelAtom,
} from "../home-page/choose-level-popup/ChooseLevelPopup";
import {
  findBestResult,
  formatTime,
  getTimePointBonus,
  pickRandomCards,
} from "../../utils/functions";
import Popup from "../../components/popup/Popup";
import Button from "../../components/button/Button";
import { LEVEL } from "../home-page/choose-level-popup/ChooseLevelContent";
import { playMusicAtom } from "../home-page/HomePage";
import { useSoundValue } from "../../components/sticky-buttons/SticktButtons";
import { useGSAP } from "@gsap/react";

export const startGameAtom = atom<boolean>(false);

export const useStartGameValue = () => useAtomValue(startGameAtom);

export type GameLevel = "easy" | "medium" | "hard";

export default function GamePage() {
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [unMatched, setUnMatched] = useState<boolean>();
  const setStartGame = useSetAtom(startGameAtom);
  const [data, setData] = useAtom(gameDataAtome);
  const [endGame, setEndGame] = useAtom(endGameAtom);
  const [level, setLevel] = useAtom(levelAtom);
  const [runningTime, setRunningTime] = useState(true);
  const [newRecord, setNewRecord] = useState(false);
  const timeSpend = useTimeSpendValue();
  const levelIdx = LEVEL.findIndex((item) => item.id === level);
  const setPlayMusic = useSetAtom(playMusicAtom);
  const playSound = useSoundValue();

  const failRef = useRef<HTMLAudioElement>(null);
  const timeOutRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (matchedCards.length === data.length) {
      const levelPoint =
        LEVEL.find((item) => item.id === level)?.bonusPoint || 0;
      const timePoint = getTimePointBonus(timeSpend);
      const totalScore = gameScore + levelPoint + timePoint;
      setGameScore(totalScore);

      const scoreList = JSON.parse(localStorage.getItem("gameScore") || "[]");

      if (scoreList.length === 0) setNewRecord(true);

      if (scoreList.length > 0) {
        const result = findBestResult(scoreList);

        if (
          (result?.score === totalScore && result?.time > timeSpend) ||
          result?.score! < totalScore
        )
          setNewRecord(true);
      } else {
        setNewRecord(false);
      }

      localStorage.setItem(
        "gameScore",
        JSON.stringify([...scoreList, { score: totalScore, time: timeSpend }])
      );

      timeout = setTimeout(() => {
        setEndGame("win");
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [matchedCards]);

  useEffect(() => {
    setRunningTime(!endGame);

    if (playSound) {
      switch (endGame) {
        case "time":
          timeOutRef?.current?.play();
          break;
        case "attempts":
          failRef?.current?.play();
          break;
        case "win": {
          if (newRecord) {
            new Audio(newRecordSound).play();
          } else {
            new Audio(passSound).play();
          }
          break;
        }
        default:
          break;
      }
    }
  }, [endGame]);

  useEffect(() => {
    if (activeCards.length < 2) return;

    if (data[activeCards[0]].id === data[activeCards[1]].id) {
      playSound &&
        setTimeout(() => {
          new Audio(correctSound).play();
        }, 400);
      setMatchedCards([...matchedCards, ...activeCards]);
      setGameScore((prev) => prev + 10);
    } else {
      playSound &&
        setTimeout(() => {
          new Audio(wrongSound).play();
        }, 400);
      setUnMatched(true);
      setTimeout(() => {
        setUnMatched(false);
      }, 1000);
    }

    const id = setTimeout(() => {
      setActiveCards([]);
    }, 1000);

    return () => clearTimeout(id);
  }, [activeCards]);

  const handleSelectCard = (id: number) => {
    if (activeCards.length === 2) {
      setActiveCards([id]);
    } else {
      setActiveCards([...activeCards, id]);
    }
  };

  const reset = () => {
    if (timeOutRef.current) {
      timeOutRef.current.pause();
      timeOutRef.current.currentTime = 0;
    }
    if (failRef.current) {
      failRef.current.pause();
      failRef.current.currentTime = 0;
    }
    setEndGame("");
    setMatchedCards([]);
    setActiveCards([]);
    setGameScore(0);
  };

  const handlePlayAgain = () => {
    reset();
    setData(pickRandomCards(level!));
  };

  const handleBackHome = () => {
    setStartGame(false);
    setLevel(null);
    reset();
    const isAllowPlayMusic = !!localStorage.getItem("playMusic");
    setPlayMusic(isAllowPlayMusic);
  };

  const handleChangeLevel = () => {
    reset();
    const nextLevel = LEVEL[levelIdx + 1]?.id || LEVEL[0].id;
    setLevel(nextLevel);
    setData(pickRandomCards(nextLevel));
  };

  useGSAP(
    () => {
      if (data.length > 0) {
        gsap.fromTo(
          ".game-card",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    },
    { dependencies: [data] }
  );

  return (
    <div className="relative w-dvw h-dvh flex flex-col items-center pt-14 pb-12 px-[6%] gap-10">
      <audio ref={failRef} src={failSound} hidden />
      <audio ref={timeOutRef} src={timeoutSound} hidden />

      <img
        src={GameBg}
        alt="game bg"
        className="absolute h-full w-full top-0 left-0 object-cover object-bottom -z-1"
      />
      <h1 className="font-title text-7xl relative z-2" id="game-title">
        ZOO CARDS
      </h1>
      <div className="flex items-start w-full h-full relative z-5 gap-[4%]">
        <div className="w-[70%] overflow-hidden h-full rounded-3xl grid gap-5 grid-cols-4 p-6 bg-blue-300/60 relative z-5">
          {data?.map((card, index) => (
            <GameCard
              active={activeCards.includes(index)}
              matched={matchedCards.includes(index)}
              unmatched={!!(unMatched && activeCards.includes(index))}
              key={index}
              data={card}
              onClick={() => handleSelectCard(index)}
              className={classNames("game-card", {
                "!pointer-events-none":
                  activeCards.length === 2 && !activeCards.includes(index),
              })}
            />
          ))}
        </div>
        <div className="grow font-bold h-full overflow-hidden">
          <GameInfo
            runningTime={runningTime}
            gameScore={gameScore}
            unMatched={!!unMatched}
          />
        </div>
      </div>

      <Popup open={!!endGame}>
        {endGame === "win" ? (
          <div className="relative z-2 h-full w-full gap-20 text-black p-6 flex flex-col items-center justify-center">
            <div
              className="absolute top-3 right-4 3xl:top-4 3xl:right-5 z-6"
              title="Back to Home"
            >
              <Button variant="icon" onClick={handleBackHome}>
                <HomeIcon className="w-14" />
              </Button>
            </div>
            {newRecord ? (
              <h1 className="text-5xl font-title 3xl:text-6xl">New Record!</h1>
            ) : (
              <h1 className="text-5xl font-title 3xl:text-6xl">
                Congratulations!
              </h1>
            )}
            <div className="font-bold text-2xl w-4/5 text-center 3xl:text-3xl">
              <p>You have completed the game in {formatTime(timeSpend)}.</p>
              <p>
                Total score is{" "}
                <span className="text-primary-600 font-extrabold text-3xl">
                  {gameScore}
                </span>{" "}
                points.
              </p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <Button onClick={handlePlayAgain}>Play Again</Button>
              {levelIdx < LEVEL.length - 1 && (
                <Button onClick={handleChangeLevel}>Try next level</Button>
              )}
            </div>
          </div>
        ) : (
          <div className="relative z-2 h-full w-full gap-20 text-black p-6 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-title">Game Over</h1>
            <div className="font-bold text-2xl 3xl:text-3xl">
              {endGame === "attempts"
                ? "You have used all your attempts. Better luck next time!"
                : "Time's up! Try to be quicker next time."}
            </div>
            <div className="flex items-center justify-center gap-8">
              <Button onClick={handlePlayAgain}>Play Again</Button>
              <Button onClick={handleBackHome}>Back to Home</Button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

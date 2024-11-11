import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as HeartIcon } from "../../../images/icons/heart.svg";
import { ReactComponent as Gutan } from "../../../images/game-data/orangutan.svg";
import { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import classNames from "classnames";
import { levelAtom } from "../../home-page/choose-level-popup/ChooseLevelPopup";
import { LEVEL } from "../../home-page/choose-level-popup/ChooseLevelContent";
import { findBestResult } from "../../../utils/functions";
import styles from "./GameInfo.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface GameInfoProps {
  runningTime: boolean;
  gameScore: number;
  unMatched: boolean;
}

type EndGameType = "attempts" | "time" | "win" | "";

export const endGameAtom = atom<EndGameType>("");
export const useEndGameValue = () => useAtomValue(endGameAtom);

export const timeSpendAtom = atom<number>(0);
export const useTimeSpendValue = () => useAtomValue(timeSpendAtom);

const ATTEMPTS = 10;

export interface GameResultDataType {
  score: number;
  time: number;
}

export default function GameInfo({
  runningTime,
  gameScore,
  unMatched,
}: GameInfoProps) {
  const [elapsedTime, setElapsedTime] = useAtom(timeSpendAtom);
  const [attemptsLeft, setAttemptsLeft] = useState(ATTEMPTS);
  const [endGame, setEndGame] = useAtom(endGameAtom);
  const [bestResult, setBestResult] = useState<
    GameResultDataType | undefined
  >();
  const level = useAtomValue(levelAtom);

  const levelName = LEVEL.find((item) => item.id === level)?.name;

  useGSAP(() => {
    gsap.fromTo(
      "#gutan-eye",
      { scale: 0.9, transformOrigin: "center" },
      { scale: 1, duration: 1, repeat: -1, yoyo: true }
    );
    gsap.fromTo(
      "#gutan-foots",
      { rotate: -3, transformOrigin: "bottom", ease: "sine" },
      { rotate: 3, duration: 1, repeat: -1, yoyo: true }
    );
  }, []);

  useEffect(() => {
    if (!endGame) {
      const scoreList = JSON.parse(localStorage.getItem("gameScore") || "[]");
      const result = findBestResult(scoreList);
      setBestResult(result);
      setAttemptsLeft(ATTEMPTS);
      setElapsedTime(0);
    }
  }, [endGame]);

  useEffect(() => {
    if (unMatched && attemptsLeft > 0) {
      setAttemptsLeft((prev) => prev - 1);
    }

    if (attemptsLeft === 0) {
      setEndGame("attempts");
    }
  }, [unMatched]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningTime) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [runningTime]);

  useEffect(() => {
    // max time is 30 minutes
    if (elapsedTime > 30 * 60) {
      setEndGame("time");
    }
  }, [elapsedTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <div className="w-full text-lg flex gap-2.5 flex-col items-center rounded-3xl bg-blue-100/90 text-primary-600 p-6">
        <div className="text-4xl mb-2 font-black">Game Infomation</div>
        <div className="flex items-center w-full justify-center gap-10">
          <div>
            <span className="text-gray-600">Score: </span>
            {gameScore}
          </div>
          <div>
            <span className="text-gray-600">Level: </span>
            {levelName}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <ClockIcon className="w-8 h-8 [&>path]:fill-primary-600 [&>path]:stroke-gray-600" />
          <div className="text-3xl my-3" id="total-time">
            {formatTime(elapsedTime)}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center w-full">
          <div className="text-gray-600 text-nowrap">Attempts Left:</div>
          <div className="flex items-centerw w-2/5 min-h-14 flex-wrap gap-2">
            {new Array(ATTEMPTS).fill(0).map((_, index) => (
              <HeartIcon
                className={classNames(
                  "w-6 h-6 opacity-100 transition-opacity duration-75 delay-700 [&>path]:fill-primary-600",
                  {
                    "opacity-40": index >= attemptsLeft,
                  }
                )}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full text-lg flex gap-2.5 flex-col items-center rounded-3xl bg-blue-100/90 text-primary-600 p-6 mt-5">
        <div className="text-4xl mb-2 font-black">Game Records</div>
        <div className="flex items-center w-full justify-center gap-10 mb-5">
          <div>
            <span className="text-gray-600">Best Score: </span>
            {bestResult?.score || 0}
          </div>
          <div>
            <span className="text-gray-600">Best Time: </span>
            {formatTime(bestResult?.time || 0)}
          </div>
        </div>
        <Gutan className="w-2/5 mb-3 overflow-visible" />
      </div>
    </>
  );
}

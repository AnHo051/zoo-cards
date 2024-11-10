import { atom, useAtomValue } from "jotai";
import GameBg from "../../images/banner/home-bg.jpg";

import styles from "./GamePage.module.css";
import { GameData } from "../../data/GameData";
import GameCard, { GameCardDataType } from "./game-card/GameCard";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

export const startGameAtom = atom<boolean>(false);

export const useStartGameValue = () => useAtomValue(startGameAtom);

type GameLevel = "easy" | "medium" | "hard";

export const pickRandomCards = (data: GameCardDataType[], level: GameLevel) => {
  if (level === "easy") {
    const cards = data.filter((card) => card.ranking === level);
    const randomCards = cards.sort(() => Math.random() - 0.5).slice(0, 8);
    return [...randomCards, ...randomCards].sort(() => Math.random() - 0.5);
  }
  const randomCate = ["tiger", "rabbit"][Math.floor(Math.random() * 2)];
  if (level === "medium") {
    // pick random 4 cards hard with the same category, and 4 cards easy.
    const hardCards = data
      .filter((card) => card.category === randomCate)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    const easyCards = data
      .filter((card) => card.ranking === "easy")
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    const randomCards = [...hardCards, ...easyCards];
    return [...randomCards, ...randomCards].sort(() => Math.random() - 0.5);
  }

  // pick 8 card hard with the same category.
  const hardCards = data
    .filter((card) => card.category === randomCate)
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
  return [...hardCards, ...hardCards].sort(() => Math.random() - 0.5);
};
const gameLevel: GameLevel = "easy";

export default function GamePage() {
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [unMatches, setUnMatched] = useState<boolean>();
  const data = useMemo(() => {
    return pickRandomCards(GameData, gameLevel);
  }, [gameLevel]);

  useEffect(() => {
    if (activeCards.length < 2) return;

    if (data[activeCards[0]].id === data[activeCards[1]].id) {
      setMatchedCards([...matchedCards, ...activeCards]);
    } else {
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

  return (
    <div className="relative w-dvw h-dvh flex flex-col items-center pt-14 pb-12 px-[6%] gap-10">
      <img
        src={GameBg}
        alt="popup bg"
        className="absolute h-full w-full top-0 left-0 object-cover object-bottom -z-1"
      />
      <h1 className="font-title text-7xl relative z-2" id="game-title">
        ZOO CARDS
      </h1>
      <div className="flex items-start w-full h-full relative z-5 gap-[5%]">
        <div className="w-[70%] overflow-hidden h-full rounded-3xl opacity-0 grid gap-5 grid-cols-4 p-6 bg-blue-300/60 relative z-5">
          {data.map((card, index) => (
            <GameCard
              active={activeCards.includes(index)}
              matched={matchedCards.includes(index)}
              unmatched={!!(unMatches && activeCards.includes(index))}
              key={card.id}
              data={card}
              onClick={() => handleSelectCard(index)}
              className={classNames({
                "!pointer-events-none":
                  activeCards.length === 2 && !activeCards.includes(index),
              })}
            />
          ))}
        </div>
        <div className="grow font-bold h-full overflow-hidden">
          <div className="w-full text-lg flex gap-2.5 flex-col items-center rounded-3xl bg-blue-300/60 text-primary-700 p-6">
            <div className="text-4xl mb-2 font-black">Game Infomation</div>
            <div className="flex items-center w-full justify-center gap-10">
              <div>Score: 0</div>
              <div>Level: easy</div>
            </div>

            <div>Time remaining: 00:00</div>
            <div>Attempts Left: tym tym</div>
          </div>
          <div className="w-full text-lg flex gap-2.5 flex-col items-center rounded-3xl bg-blue-300/60 text-primary-700 p-6 mt-5">
            <div className="text-4xl mb-2 font-black">Game Record</div>
            <div className="flex items-center w-full justify-center gap-10">
              <div>Best Score: 0</div>
              <div>Best Time: 00:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

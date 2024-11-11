import { GAME_DATA } from "../data/GameData";
import { GameCardDataType } from "../pages/game-page/game-card/GameCard";
import { GameResultDataType } from "../pages/game-page/game-info/GameInfo";
import { GameLevel } from "../pages/game-page/GamePage";

const shuffleArray = (array: GameCardDataType[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const TOTAL_CARDS = 2;

export const pickRandomCards = (level: GameLevel) => {
  const data = GAME_DATA as GameCardDataType[];
  if (level === "easy") {
    const cards = data.filter((card) => card.ranking === level);
    const randomCards = cards
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_CARDS);
    return shuffleArray([...randomCards, ...randomCards]);
  }
  const randomCate = ["tiger", "rabbit"][Math.floor(Math.random() * 2)];
  if (level === "medium") {
    // pick random 4 cards hard with the same category, and 4 cards easy.
    const hardCards = data
      .filter((card) => card.category === randomCate)
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_CARDS / 2);
    const easyCards = data
      .filter((card) => card.ranking === "easy")
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL_CARDS / 2);
    const randomCards = [...hardCards, ...easyCards];
    return shuffleArray([...randomCards, ...randomCards]);
  }

  // pick 8 card hard with the same category.
  const hardCards = data
    .filter((card) => card.category === randomCate)
    .sort(() => Math.random() - 0.5)
    .slice(0, TOTAL_CARDS);
  return shuffleArray([...hardCards, ...hardCards]);
};

export const getTimePointBonus = (time: number) => {
  if (time < 5 * 60) return 100;
  if (time < 10 * 60) return 50;
  return 0;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const minutesText = minutes > 0 ? `${minutes} minutes` : "";
  const secondsText = seconds > 0 ? `${seconds} seconds` : "";

  return `${minutesText} ${secondsText}`;
};

export const findBestResult = (scoreList: GameResultDataType[]) => {
  return scoreList.reduce(
    (
      acc: { score: number; time: number } | undefined,
      item: { score: number; time: number }
    ) => {
      if (!acc) return item;
      if (item.score > acc.score) return item;
      if (item.score === acc.score && item.time < acc.time) return item;
      return acc;
    },
    undefined
  );
};

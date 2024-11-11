import { useEffect, useState } from "react";
import GameCard, { GameCardDataType } from "../game-card/GameCard";
import GameInfo from "../game-info/GameInfo";
import classNames from "classnames";

interface GameMainProps {
  data: GameCardDataType[];
}

export default function GameMain({ data }: GameMainProps) {
  const [activeCards, setActiveCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameScore, setGameScore] = useState<number>(0);
  const [unMatched, setUnMatched] = useState<boolean>();

  useEffect(() => {
    if (activeCards.length < 2) return;

    if (data[activeCards[0]].id === data[activeCards[1]].id) {
      setMatchedCards([...matchedCards, ...activeCards]);
      setGameScore((prev) => prev + 10);
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
    <div className="flex items-start w-full h-full relative z-5 gap-[5%]">
      <div className="w-[70%] overflow-hidden h-full rounded-3xl grid gap-5 grid-cols-4 p-6 bg-blue-300/60 relative z-5">
        {data.map((card, index) => (
          <GameCard
            active={activeCards.includes(index)}
            matched={matchedCards.includes(index)}
            unmatched={!!(unMatched && activeCards.includes(index))}
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
        <GameInfo
          runningTime={false}
          gameScore={gameScore}
          unMatched={!!unMatched}
        />
      </div>
    </div>
  );
}

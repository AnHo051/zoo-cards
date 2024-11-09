import { atom, useAtomValue } from "jotai";
import GameBg from "../../images/home-bg.jpg";
import CardBack from "../../images/card-back.jpg";
import styles from "./GamePage.module.css";

export const startGameAtom = atom<boolean>(false);

export const useStartGameValue = () => useAtomValue(startGameAtom);

export default function GamePage() {
  return (
    <div className="relative w-dvw h-dvh flex flex-col items-center pt-14 pb-12 px-[6%] gap-10">
      {/* <div className="absolute h-full w-full top-0 left-0 bg-black/10 z-1"></div> */}
      <img
        src={GameBg}
        alt="popup bg"
        className="absolute h-full w-full top-0 left-0 object-cover object-bottom -z-1"
      />
      <h1 className="font-title text-7xl relative z-2" id="game-title">
        ZOO CARDS
      </h1>
      <div className="flex items-start w-full h-full relative z-5 gap-[5%]">
        <div className="w-[70%] overflow-hidden h-full rounded-3xl  grid gap-5 grid-cols-4 p-6 bg-blue-300/60 relative z-5">
          {new Array(16).fill(0).map((_, index) => (
            <div
              key={index}
              className="relative cursor-pointer w-full h-full rounded-2xl overflow-hidden border-gray-500 border-2"
            >
              <img
                src={CardBack}
                alt="card back"
                className="absolute top-0 left-0 w-full h-full object-cover -z-1"
              />
            </div>
          ))}
        </div>
        <div className="grow rounded-3xl h-full bg-red-400 flex flex-col items-center">
          <div>Game Info</div>
          <div>Time remainin: 00:00</div>
          <div>Score: 0</div>
          <div>Level: 1</div>
          <div>Attempts Left: tym tym</div>
        </div>
      </div>
    </div>
  );
}

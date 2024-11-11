import Button from "../button/Button";
import { ReactComponent as SoundIcon } from "../../images/icons/sound.svg";
import { ReactComponent as MusicIcon } from "../../images/icons/music.svg";
import { ReactComponent as HomeIcon } from "../../images/icons/home.svg";

import styles from "./StickyButtons.module.css";
import { playMusicAtom } from "../../pages/home-page/HomePage";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { startGameAtom } from "../../pages/game-page/GamePage";
import { levelAtom } from "../../pages/home-page/choose-level-popup/ChooseLevelPopup";

export const soundAtom = atom<boolean>(true);
export const useSoundValue = () => useAtomValue(soundAtom);

export default function SticktButtons() {
  const [playMusic, setPlayMusic] = useAtom(playMusicAtom);
  const [startGame, setStartGame] = useAtom(startGameAtom);
  const [sound, setSound] = useAtom(soundAtom);
  const setLevel = useSetAtom(levelAtom);

  const handleClickMusic = () => {
    if (playMusic) {
      setPlayMusic(false);
      localStorage.removeItem("playMusic");
    } else {
      setPlayMusic(true);
      localStorage.setItem("playMusic", "true");
    }
  };

  const handleBackHome = () => {
    setStartGame(false);
    setLevel(null);
    const isAllowPlayMusic = !!localStorage.getItem("playMusic");
    setPlayMusic(isAllowPlayMusic);
  };

  return (
    <div className="fixed bottom-20 right-10 z-10 flex flex-col gap-5">
      <Button
        variant="icon"
        className={styles["btn"]}
        title={playMusic ? "Stop sound" : "Play sound"}
        onClick={() => setSound((prev) => !prev)}
      >
        {!sound && (
          <div className="absolute w-4/5 h-1 top-1/2 left-2 bg-black rounded-xl rotate-45"></div>
        )}
        <SoundIcon className="w-12" />
      </Button>
      {!startGame ? (
        <Button
          variant="icon"
          className={styles["btn"]}
          title={playMusic ? "Stop music" : "Play music"}
          onClick={handleClickMusic}
        >
          {!playMusic && (
            <div className="absolute w-4/5 h-1 top-1/2 left-2 bg-black rounded-xl rotate-45"></div>
          )}
          <MusicIcon className="w-12" />
        </Button>
      ) : (
        <Button
          variant="icon"
          className={styles["btn"]}
          title="Back to Home"
          onClick={handleBackHome}
        >
          <HomeIcon className="w-14 mb-0.5" />
        </Button>
      )}
    </div>
  );
}

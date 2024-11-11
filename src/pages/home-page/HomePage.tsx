import { useEffect, useRef, useState } from "react";
import HomeBg from "../../images/banner/home-bg.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./HomePage.module.css";
import TreesDecor from "./trees-decor/TreesDecor";
import AnimalsDecor from "./animals-decor/AnimalsDecor";
import BannerContent from "./banner-content/BannerContent";
import ZooSong from "../../audio/zoo-song.mp3";
import MusicPopup from "./music-popup/MusicPopup";
import { atom, useAtom } from "jotai";

// gsap.registerPlugin(SplitText);

let runAnimation = true;

export const playMusicAtom = atom<boolean>(false);
export const showMusicPopupAtom = atom<boolean>(true);

export default function HomePage() {
  const rootRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playMusic, setPlayMusic] = useAtom(playMusicAtom);
  const [showPopup, setShowPopup] = useAtom(showMusicPopupAtom);

  useEffect(() => {
    if (playMusic) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
      if (audioRef?.current) audioRef.current.currentTime = 0;
    }
  }, [playMusic]);

  useGSAP(() => {
    if (runAnimation) {
      // var split = new SplitText("#game-title", { type: "chars" });

      const timline = gsap.timeline({ ease: "power2.inOut" });
      timline
        .from("#sun", {
          duration: 1.5,
          top: 100,
          autoAlpha: 0,
        })
        .from("#game-title", {
          duration: 0.5,
          y: 70,
          autoAlpha: 0,
        })
        // .from(
        //   split.chars,
        //   {
        //     duration: 1,
        //     y: 70,
        //     autoAlpha: 0,
        //     stagger: 0.05,
        //     scale: 0.5,
        //   },
        //   "=-0.75"
        // )
        .from(".btn-play", {
          duration: 0.5,
          y: 70,
          autoAlpha: 0,
          onComplete: () => {
            runAnimation = false;
          },
        });
    }
  }, [{ container: rootRef.current }]);

  const handleConfirm = () => {
    localStorage.setItem("playMusic", "true");
    setPlayMusic(true);
    setShowPopup(false);
  };

  const handleCancel = () => {
    localStorage.removeItem("playMusic");
    setPlayMusic(false);
    setShowPopup(false);
  };

  return (
    <div
      ref={rootRef}
      className="h-dvh overflow-hidden w-screen relative flex items-center justify-center"
    >
      <audio ref={audioRef} src={ZooSong} autoPlay loop id="zoo-song" />

      <img
        src={HomeBg}
        alt="home bg"
        className="absolute h-full w-full object-cover object-bottom"
      />

      {!showPopup && (
        <>
          <div className={styles["sun"]} id="sun">
            <div className={styles["sun-face"]}></div>

            {new Array(6).fill(0).map((_, index) => (
              <div key={index} className={styles["sun-ray"]}></div>
            ))}
          </div>
          <BannerContent />

          <TreesDecor />

          <AnimalsDecor />
        </>
      )}
      {showPopup && (
        <MusicPopup onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
}

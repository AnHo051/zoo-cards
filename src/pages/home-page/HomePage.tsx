import { useRef } from "react";
import HomeBg from "../../images/home-bg.jpg";
import gsap from "gsap";
import Button from "../../components/button/Button";
import { useGSAP } from "@gsap/react";
import styles from "./HomePage.module.css";
import TreesDecor from "./trees-decor/TreesDecor";
import AnimalsDecor from "./animals-decor/AnimalsDecor";

gsap.registerPlugin(SplitText);

export default function HomePage() {
  const rootRef = useRef(null);

  useGSAP(() => {
    var split = new SplitText("#game-title", { type: "chars" });

    const timline = gsap.timeline({ ease: "power2.inOut" });
    timline
      .from("#sun", {
        duration: 1.5,
        top: 100,
        autoAlpha: 0,
      })
      .from(
        split.chars,
        {
          duration: 1,
          y: 70,
          autoAlpha: 0,
          stagger: 0.05,
          scale: 0.5,
        },
        "=-0.75"
      )
      .from(".btn-play", {
        duration: 0.5,
        y: 70,
        autoAlpha: 0,
      });
  }, [{ container: rootRef.current }]);

  return (
    <div
      ref={rootRef}
      className="h-dvh overflow-hidden w-screen relative flex items-center justify-center"
    >
      <img
        src={HomeBg}
        alt="home-bg"
        className="absolute h-full w-full object-cover object-bottom"
      />

      <div className={styles["sun"]} id="sun">
        <div className={styles["sun-face"]}></div>

        {new Array(6).fill(0).map((_, index) => (
          <div key={index} className={styles["sun-ray"]}></div>
        ))}
      </div>

      <TreesDecor />

      <AnimalsDecor />

      <div className="relative z-1 h-1/2 flex items-center justify-start gap-[15vh] flex-col">
        <h1 className="font-title text-8xl" id="game-title">
          ZOO CARDS
        </h1>
        <div>
          <Button className="animate-bounce btn-play">Start Game</Button>
        </div>
      </div>
    </div>
  );
}

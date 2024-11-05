import Button from "../../../components/button/Button";
import { ReactComponent as CloseIcon } from "../../../images/close.svg";
import { ReactComponent as Penguin } from "../../../images/penguin.svg";
import { ReactComponent as Elk } from "../../../images/elk.svg";
import { ReactComponent as Lion } from "../../../images/lion.svg";
import PopupBg from "../../../images/popup-bg.jpg";
import styles from "./ChooseLevelPopup.module.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import classNames from "classnames";
import { atom, useAtomValue, useSetAtom } from "jotai";

const levelAtom = atom<string | undefined>();
export const useLevelValue = () => useAtomValue(levelAtom);

interface ChooseLevelPopupProps {
  open: boolean;
  onClose: () => void;
}

export const LEVEL = ["NEWBIE", "INTERMEDIATE", "EXPERT"];

export default function ChooseLevelPopup({
  open,
  onClose,
}: ChooseLevelPopupProps) {
  const setLevel = useSetAtom(levelAtom);

  useGSAP(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eyes = document.querySelectorAll("#popup-eye");
      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        const distance = Math.min(
          10,
          Math.hypot(event.clientX - eyeX, event.clientY - eyeY) / 10
        );
        gsap.to(eye, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          duration: 0.1,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center pointer-events-none justify-center opacity-0",
        { "opacity-100 pointer-events-auto": open }
      )}
    >
      <div
        className={classNames(
          styles["popup-content"],
          "scale-0 opacity-0 transition-transform delay-100 duration-200",
          { "scale-100 opacity-100": open }
        )}
      >
        <div className="absolute h-full w-full top-0 left-0 bg-black/20 z-2"></div>
        <img
          src={PopupBg}
          alt="popup bg"
          className="absolute h-full w-full top-0 left-0 object-cover object-bottom z-1"
        />
        <div className="absolute top-3 right-4 3xl:top-4 3xl:right-5 z-6">
          <Button
            variant="icon"
            className={styles["btn-close"]}
            onClick={() => onClose()}
          >
            <CloseIcon />
          </Button>
        </div>
        <div className="flex w-full pt-16 3xl:pt-24 pb-10 px-10 flex-col gap-16 3xl:gap-24 items-center h-full relative z-4">
          <h2 className="font-title text-[2.75rem] 3xl:text-6xl">
            CHOOSE YOUR LEVEL
          </h2>

          <div className="w-full flex items-center justify-evenly">
            <div
              onClick={() => setLevel(LEVEL[0])}
              className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
            >
              <Penguin className="w-1/2 h-auto" />
              <div className="text-2xl 3xl:text-4xl font-button">
                {LEVEL[0]}
              </div>
            </div>
            <div
              onClick={() => setLevel(LEVEL[1])}
              className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
            >
              <Elk className="w-1/2 h-auto" />
              <div className="text-2xl 3xl:text-4xl font-button">
                {LEVEL[1]}
              </div>
            </div>
            <div
              onClick={() => setLevel(LEVEL[2])}
              className="w-[27%] cursor-pointer hover:scale-110 transition-transform py-5 px-2 gap-3 border-primary-600 bg-white rounded-3xl border-8 flex flex-col items-center justify-between"
            >
              <Lion className="w-1/2 h-auto ml-3" />
              <div className="text-2xl 3xl:text-4xl font-button">
                {LEVEL[2]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

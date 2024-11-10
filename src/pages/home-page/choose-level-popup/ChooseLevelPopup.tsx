import Button from "../../../components/button/Button";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";

import PopupBg from "../../../images/banner/popup-bg.jpg";
import styles from "./ChooseLevelPopup.module.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import classNames from "classnames";
import { atom, useAtom, useAtomValue } from "jotai";
import { ReactComponent as BackIcon } from "../../../images/icons/back.svg";
import GameRule from "../game-rule/GameRule";
import ChooseLevelContent from "./ChooseLevelContent";

const levelAtom = atom<string>("");
export const useLevelValue = () => useAtomValue(levelAtom);

interface ChooseLevelPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ChooseLevelPopup({
  open,
  onClose,
}: ChooseLevelPopupProps) {
  const [level, setLevel] = useAtom(levelAtom);

  useGSAP(
    () => {
      gsap.fromTo(
        "#popup-content",
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        },
        { duration: 0.3, opacity: 1, scale: 1 }
      );
    },
    { dependencies: [open] }
  );

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
  });

  if (!open) return null;

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center"
      )}
    >
      <div id="popup-content" className={styles["popup-content"]}>
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
            onClick={() => {
              onClose();
              setLevel("");
            }}
          >
            <CloseIcon />
          </Button>
        </div>

        {level ? (
          <>
            <div className="absolute top-3 left-4 3xl:top-4 3xl:left-5 z-6">
              <Button
                variant="icon"
                className={styles["btn-close"]}
                onClick={() => setLevel("")}
              >
                <BackIcon />
              </Button>
            </div>
            <GameRule />
          </>
        ) : (
          <ChooseLevelContent setLevel={setLevel} />
        )}
      </div>
    </div>
  );
}

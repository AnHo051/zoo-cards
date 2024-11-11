import classNames from "classnames";
import styles from "./Popup.module.css";
import PopupBg from "../../images/banner/popup-bg.jpg";
import { ReactComponent as CloseIcon } from "../../images/icons/close.svg";
import Button from "../button/Button";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PopupProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Popup({
  open,
  onClose,
  children,
  className,
}: PopupProps) {
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
  if (!open) return null;

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center",
        className
      )}
    >
      <div id="popup-content" className={styles["popup-content"]}>
        <div className="absolute h-full w-full top-0 left-0 bg-black/20 z-2"></div>
        <img
          src={PopupBg}
          alt="popup bg"
          className="absolute h-full w-full top-0 left-0 object-cover object-bottom z-1"
        />
        {onClose && (
          <div className="absolute top-3 right-4 3xl:top-4 3xl:right-5 z-6">
            <Button variant="icon" onClick={onClose}>
              <CloseIcon />
            </Button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

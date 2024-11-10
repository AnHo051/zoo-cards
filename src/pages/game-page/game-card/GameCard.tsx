import styles from "./GameCard.module.css";
import CardFront from "../../../images/game-data/card.jpg";
import classNames from "classnames";

export interface GameCardDataType {
  id: number;
  img: string;
  ranking: string;
  category?: string;
}

interface GameCardProps {
  className?: string;
  data: GameCardDataType | undefined;
  active: boolean;
  matched: boolean;
  unmatched: boolean;
  onClick: () => void;
}

export default function GameCard({
  data,
  active,
  matched,
  onClick,
  unmatched,
  className,
}: GameCardProps) {
  return (
    <div
      className={classNames(
        styles["card"],
        { [styles["active"]]: active },
        { [styles["matched"]]: matched },
        {
          [styles["unmatched"]]: unmatched,
        },
        className
      )}
      onClick={onClick}
    >
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>
          <img
            src={CardFront}
            alt="card back"
            className="w-full h-full object-cover z-1"
          />
        </div>

        <div className={styles["card-back"]}>
          <div className={styles["overlay"]}></div>
          <img src={data?.img} alt="card" className="w-[55%] h-auto" />
        </div>
      </div>
    </div>
  );
}

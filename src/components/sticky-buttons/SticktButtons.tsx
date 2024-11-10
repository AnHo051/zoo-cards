import Button from "../button/Button";
import { ReactComponent as SoundIcon } from "../../images/icons/sound.svg";
import { ReactComponent as SettingIcon } from "../../images/icons/setting.svg";

import styles from "./StickyButtons.module.css";

export default function SticktButtons() {
  return (
    <div className="fixed bottom-20 right-10 z-50 flex flex-col gap-5">
      <Button variant="icon" className={styles["btn"]}>
        <SoundIcon className="w-12" />
      </Button>
      <Button variant="icon" className={styles["btn"]}>
        <SettingIcon className="w-12" />
      </Button>
    </div>
  );
}

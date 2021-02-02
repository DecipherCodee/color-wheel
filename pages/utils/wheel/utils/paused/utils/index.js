import { useWheelStore } from "../..";
import { useSVGs } from "../../../../../../public/svgs";
import { usePauseStore } from "../../../../footer/utils/pause/utils";
import { useTitleStore } from "../../../../header/utils/title/utils";
import styles from "./style.module.scss";

const { paused, restart, quit, start } = styles;

export function useStore() {
  const { restartGame, quitGame } = useWheelStore();
  const { onClick } = usePauseStore();
  const { usePauseName: PauseName } = useSVGs();
  const { initName, putShow: showTitle } = useTitleStore();

  return {
    paused,
    PauseName,
    restart,
    restartGame: restartGame.bind(null, { initName, showTitle }),
    start,
    onClick,
    quit,
    quitGame,
  };
}

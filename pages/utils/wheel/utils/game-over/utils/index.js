import { useWheelStore } from "../..";
import { useSVGs } from "../../../../../../public/svgs";
import { useTitleStore } from "../../../../header/utils/title/utils";
import styles from "./style.module.scss";

const { gameOver, table, colors, time } = styles;

export function useStore() {
  const { initAllFocused, quitGame, restartGame, initProps } = useWheelStore();
  const {
    useRecordList: RecordList,
    useColorList: ColorList,
  } = initProps.onContent();
  const { useGameOverLogo: GameOver } = useSVGs();
  const { initName, putShow: showTitle } = useTitleStore();

  return {
    gameOver,
    GameOver,
    table,
    colors,
    ColorList,
    RecordList,
    restartGame: restartGame.bind(null, { initName, showTitle }),
    initAllFocused,
    time,
    quitGame,
  };
}

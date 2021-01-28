import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useGStore as GStore } from "../..";
import { useTitleStore as TitleStore } from "../../header/utils/title/utils";
import styles from "./style.module.scss";
import { usePauseStore as PauseStore } from "../../footer/utils/pause/utils";
import { useSVGs } from "../../../../public/svgs";

let animate;
let initDragged;
let putDrag = () => {};
let initResized;
let putResize = () => {};
let initFlipped;
let putFlip = () => {};
let initQuitted;
let putQuit = () => {};
let initAllFocused;
let putFocusAll = () => {};
let initProps;
let putProps = () => {};
const defaultProps = {
  onDrag() {},
  onFocusAll() {},
  onGameStart() {},
  onRestartLevel() {},
  onContent() {
    return { useColorList() {}, useRecordList() {} };
  },
};
let appWidth;

const {
  wheel,
  grab,
  contents,
  table,
  colors,
  time,
  pause,
  quit: quitButton,
  continue: start,
  restart: restartButton,
  flip: flipWheel,
} = styles;
const variants = {
  normal: {
    scale: 1,
    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
  },
  resized: {
    scale: 0.6,
    boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.2)",
  },
  unflipped: {
    width: 66.4,
    height: 72.8,
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
  },
  flipped() {
    return {
      x: 0,
      y: -60,
      width: appWidth >= 367 ? 330 : "80%",
      height: appWidth >= 367 ? 365 : "50%",
      rotateX: -180,
      rotateY: -180,
    };
  },
};
const transition = {
  type: "spring",
  duration: 0.6,
  mass: 0.2,
  damping: 9,
};

function onDragStart() {
  const { initView } = GStore();
  const { initStarted } = TitleStore();

  putResize(() => {
    if (initView !== "home" && !initStarted) {
      return false;
    }
    return true;
  });
  initProps.onGameStart();
}
function onDragEnd() {
  putResize(false);
}
function resizeWheel({ isResized }) {
  if (isResized) {
    animate.start("resized");
  } else {
    animate.start("normal");
  }
}
function restartGame() {
  const { putShow: showTitle, initName } = TitleStore();

  if (initName !== "Practice") {
    const { putMount: mountPause } = PauseStore();
    mountPause(true);
    showTitle((old) => !old);
  }
  const { putIndex } = GStore();

  putIndex(0);
  initProps.onRestartLevel();
  putFlip(false);
  animate.start("unflipped");
  putDrag(true);
}
function quitGame() {
  const { putShow: showPause } = PauseStore();

  const { putIndex } = GStore();

  putIndex(0);
  showPause(false);
  putQuit(true);
  const { putShow: showTitle } = TitleStore();

  initProps.onRestartLevel();
  showTitle((old) => {
    if (!old) {
      return old;
    }
    return false;
  });
  putFlip(false);
  animate.start("unflipped");
  putDrag(true);
}
function useContents() {
  const { useGameOverLogo: GameOver, usePauseName: PauseName } = useSVGs();
  const { initName } = TitleStore();
  const { onClick } = PauseStore();
  const {
    useRecordList: RecordList,
    useColorList: ColorList,
  } = initProps.onContent();

  return initFlipped && (initName === "0:00" || initName === "Practice") ? (
    <main className={contents}>
      <GameOver />

      <aside className={table}>
        <ul className={colors}>
          <header>Color</header>

          <ColorList />

          <button type="button" onClick={restartGame}>
            {initAllFocused ? "Restart" : "Try again"}
          </button>
        </ul>

        <ul className={time}>
          <header>Time</header>
          <RecordList />

          <button type="button" onClick={quitGame}>
            Quit
          </button>
        </ul>
      </aside>
    </main>
  ) : (
    initFlipped && (initName !== "0:00" || initName !== "Practice") && (
      <main className={pause}>
        <PauseName />

        <aside>
          <button className={restartButton} type="button" onClick={restartGame}>
            Restart
          </button>
          <button className={start} type="button" onClick={onClick}>
            Continue
          </button>
        </aside>

        <button className={quitButton} type="button" onClick={quitGame}>
          Quit
        </button>
      </main>
    )
  );
}

export function useStore() {
  const { unmount, ref } = GStore();
  animate = useAnimation();
  appWidth = ref.current?.clientWidth;

  const [isQuitted, quit] = useState(false);
  initQuitted = isQuitted;
  putQuit = quit;
  useEffect(() => unmount({ set: putQuit, value: false }), [unmount]);
  useEffect(() => {
    initQuitted = isQuitted;
  }, [isQuitted]);

  const [isResized, resize] = useState(false);
  initResized = isResized;
  putResize = resize;
  useEffect(() => unmount({ set: resize, value: false }), [unmount]);
  useEffect(() => {
    initResized = isResized;
  }, [isResized]);
  useEffect(() => resizeWheel({ isResized }), [isResized]);

  const [isDragged, drag] = useState(true);
  initDragged = isDragged;
  putDrag = drag;
  useEffect(() => unmount({ set: drag, value: true }), [unmount]);
  useEffect(() => {
    initDragged = isDragged;
  }, [isDragged]);

  const [isFlipped, flip] = useState(false);
  initFlipped = isFlipped;
  putFlip = flip;
  useEffect(() => unmount({ set: putFlip, value: false }), [unmount]);
  useEffect(() => {
    initFlipped = isFlipped;
  }, [isFlipped]);

  const [isAllFocused, focusAll] = useState(false);
  initAllFocused = isAllFocused;
  putFocusAll = focusAll;
  useEffect(() => unmount({ set: putFocusAll, value: false }), [unmount]);
  useEffect(() => {
    initAllFocused = isAllFocused;
  }, [isAllFocused]);

  const [props, setProps] = useState(defaultProps);
  initProps = props;
  putProps = setProps;
  useEffect(() => () => putProps(defaultProps), []);
  useEffect(() => {
    initProps = props;
  }, [props]);

  useEffect(() => {
    if (!isFlipped) {
      return;
    }
    initProps.onFocusAll();
  }, [isFlipped]);

  return {
    transition,
    Contents: useContents,
    ref,
    isDragged: initDragged,
    animate,
    className: useMemo(
      () => `${wheel} ${isResized && grab} ${isFlipped && flipWheel}`,
      [isFlipped, isResized]
    ),
    variants,
    motion,
    onDragStart,
    onDrag: initProps.onDrag,
    onDragEnd,
  };
}
export function useWheelStore() {
  return {
    initAllFocused,
    putFocusAll,
    initProps,
    putProps,
    initResized,
    putResize,
    animate,
    initDragged,
    putDrag,
    initFlipped,
    putFlip,
    initQuitted,
    putQuit,
  };
}

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
let appWidth;

export const defaultProps = {
  onDrag: null,
  onFocusAll: null,
  onGameStart: null,
  onRestartLevel: null,
  onContent() {
    return { useColorList() {}, useRecordList() {} };
  },
};
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
export const variants = {
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
export function updateDragged({ isDragged, drag }) {
  initDragged = isDragged;
  if (drag) {
    putDrag = drag;
  }
}
export function updateQuitted({ isQuitted, quit }) {
  initQuitted = isQuitted;
  if (quit) {
    putQuit = quit;
  }
}
export function updateResized({ isResized, resize }) {
  initResized = isResized;
  if (resize) {
    putResize = resize;
  }
}
export function updateFlipped({ isFlipped, flip }) {
  initFlipped = isFlipped;
  if (flip) {
    putFlip = flip;
  }
}
export function updateAllFocused({ isAllFocused, focusAll }) {
  initAllFocused = isAllFocused;
  if (focusAll) {
    putFocusAll = focusAll;
  }
}
export function updateProps({ props, setProps }) {
  initProps = props;
  if (setProps) {
    putProps = setProps;
  }
}
export function onFlip({ isFlipped, onFocusAll }) {
  if (!isFlipped) {
    return;
  }
  onFocusAll();
}

export function useStore() {
  const { unmount, ref } = GStore();
  animate = useAnimation();
  appWidth = ref.current?.clientWidth;

  const [isQuitted, quit] = useState(false);
  updateQuitted({ isQuitted, quit });
  useEffect(unmount.bind(null, { set: putQuit, value: false }), [unmount]);
  useEffect(updateQuitted.bind(null, { isQuitted }), [isQuitted]);

  const [isResized, resize] = useState(false);
  updateResized({ isResized, resize });
  useEffect(unmount.bind(null, { set: resize, value: false }), [unmount]);
  useEffect(updateResized.bind(null, { isResized }), [isResized]);
  useEffect(resizeWheel.bind(null, { isResized }), [isResized]);

  const [isDragged, drag] = useState(true);
  updateDragged({ isDragged, drag });
  useEffect(unmount.bind(null, { set: drag, value: true }), [unmount]);
  useEffect(updateDragged.bind(null, { isDragged }), [isDragged]);

  const [isFlipped, flip] = useState(false);
  updateFlipped({ isFlipped, flip });
  useEffect(unmount.bind(null, { set: putFlip, value: false }), [unmount]);
  useEffect(updateFlipped.bind(null, { isFlipped }), [isFlipped]);

  const [isAllFocused, focusAll] = useState(false);
  updateAllFocused({ isAllFocused, focusAll });
  useEffect(unmount.bind(null, { set: putFocusAll, value: false }), [unmount]);
  useEffect(updateAllFocused.bind(null, { isAllFocused }), [isAllFocused]);

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(unmount.bind(null, { set: putProps, value: defaultProps }), [
    unmount,
  ]);
  useEffect(updateProps.bind(null, { props }), [props]);

  useEffect(onFlip.bind(null, { isFlipped, onFocusAll: props.onFocusAll }), [
    isFlipped,
    props.onFocusAll,
  ]);

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

/* eslint-disable react-hooks/exhaustive-deps */
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useGStore as GStore } from "../..";
import { useTitleStore as TitleStore } from "../../header/utils/title/utils";
import styles from "./style.module.scss";
import { usePauseStore as PauseStore } from "../../footer/utils/pause/utils";

let animate;
let initDragged;
let putDrag;
let initResized;
let putResize;
let initFlipped;
let putFlip;
let initQuitted;
let putQuit;
let initAllFocused;
let putFocusAll;
let initProps;
let putProps;
let appWidth;

export const GameOver = dynamic(() =>
  import("./game-over").then((mod) => mod.useGameOver)
);
export const Paused = dynamic(() =>
  import("./paused").then((mod) => mod.usePaused)
);

export const defaultProps = {
  onDrag: null,
  onFocusAll: null,
  onGameStart: null,
  onRestartLevel: null,
  onContent: null,
};
const { wheel, grab, flip: flipWheel } = styles;

export function isWidth({ initWidth }) {
  let width;
  let height;

  if (initWidth >= 367) {
    width = 330;
    height = 365;
  } else {
    width = "80%";
    height = "50%";
  }
  return { width, height };
}

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
    const { width, height } = isWidth({ initWidth: appWidth });

    return {
      x: 0,
      y: -60,
      width,
      height,
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

export function isView({ initView, initStarted }) {
  if (initView !== "home" && !initStarted) {
    return false;
  }
  return true;
}
export function onDragStart() {
  const { initView } = GStore();
  const { initStarted } = TitleStore();

  putResize(isView.bind(null, { initView, initStarted }));

  initProps.onGameStart();
}
export function onDragEnd() {
  putResize(false);
}
export function resizeWheel({ isResized }) {
  if (isResized) {
    animate.start("resized");
  } else {
    animate.start("normal");
  }
}
export function restartGame({ initName, showTitle }) {
  if (initName !== "Practice") {
    const { putMount: mountPause = () => {} } = PauseStore();
    mountPause(true);
    showTitle((old) => !old);
  }
  const { putIndex = () => {} } = GStore();

  putIndex(0);
  initProps.onRestartLevel();
  putFlip(false);
  animate.start("unflipped");
  putDrag(true);
}
export function isTitle(old) {
  if (!old) {
    return old;
  }
  return false;
}
export function quitGame() {
  const { putShow: showPause = () => {} } = PauseStore();

  const { putIndex = () => {} } = GStore();

  putIndex(0);
  showPause(false);
  putQuit(true);
  const { putShow: showTitle = () => {} } = TitleStore();

  initProps.onRestartLevel();
  showTitle(isTitle);
  putFlip(false);
  animate.start("unflipped");
  putDrag(true);
}
export function isContent({ isFlipped, name }) {
  if (isFlipped) {
    if (name === "0:00" || name === "Practice") {
      return <GameOver test="game-over" />;
    }
    return <Paused test="paused" />;
  }
  return null;
}
export function useContents({ name }) {
  const content = isContent({ name, isFlipped: initFlipped });

  return content;
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
  if (onFocusAll) {
    onFocusAll();
  }
}
export function useClassName({ isResized, isFlipped }) {
  return `${wheel} ${isResized && grab} ${isFlipped && flipWheel}`;
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

  const { initName } = TitleStore();

  return {
    initName,
    transition,
    Contents: useContents,
    ref,
    isDragged: initDragged,
    animate,
    className: useMemo(useClassName.bind(null, { isFlipped, isResized }), [
      isFlipped,
      isResized,
    ]),
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
    restartGame,
    quitGame,
  };
}

import { useEffect, useMemo, useState } from "react";
import { useProps as pauseProps } from "../..";
import { useProps as useAppProps } from "../../../../../../..";
import { useProps as wheelProps } from "../../../../../../../wheel/utils";
import { useProps as titleProps } from "../../../../../../header/utils/title/utils";
import { contents, show as showPause } from "./style.module.scss";

let initShown = true;
let putShow;
let initPaused;
let putPause;

function onClick() {
  const { putStart, initStarted, putCount } = titleProps();
  const { animation, putDrag, putFlip } = wheelProps();

  putPause((old) => !old);

  if (initStarted) {
    putCount((count) => count + 1);
    putStart(false);
    putFlip(true);
    putDrag(false);
    animation.start("flipped");
  } else {
    putStart(true);
    putFlip(false);
    animation.start("unflipped");
  }
}

function updatePaused({ isGamePaused, pauseGame }) {
  if (initPaused !== isGamePaused) {
    initPaused = isGamePaused;
  }
  if (pauseGame && putPause !== pauseGame) {
    putPause = pauseGame;
  }
}
function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}

export function useStore() {
  const { unmount, onAnimationEnd } = useAppProps();

  const [isGamePaused, pauseGame] = useState(false);
  updatePaused({ isGamePaused, pauseGame });
  useEffect(() => unmount({ set: pauseGame }), [unmount]);
  useEffect(() => updatePaused({ isGamePaused }), [isGamePaused]);

  const [isShown, show] = useState(initShown);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  useEffect(() => show(true), []);

  const { putMount } = pauseProps();

  return {
    onClick,
    onAnimationEnd: onAnimationEnd.bind(null, { isShown, putMount }),
    className: useMemo(() => `${contents} ${isShown && showPause}`, [isShown]),
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initPaused,
    putPause,
    onClick,
  };
}

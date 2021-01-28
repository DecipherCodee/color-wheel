import { useEffect, useMemo, useState } from "react";
import { useGStore as GStore } from "../../../..";
import { usePauseStore as PauseStore } from "../../../../footer/utils/pause/utils";
import { useWheelStore as WheelStore } from "../../../../wheel/utils";
import styles from "./style.module.scss";

let initShown;
let putShow = () => {};
let initName;
let putName = () => {};
let initCount;
let putCount = () => {};
let initStarted;
let putStart = () => {};
let initProps;
let putProps = () => {};

const defaultProps = { onHideLevel() {}, onAnimateWheel() {} };
const initTitle = "Level 1";
const { title, show: showTitle } = styles;

function getCount({ count }) {
  if (count < 60) {
    return `0:${`0${count}`.slice(-2)}`;
  }
  return "1:00";
}
function onTransitionEnd() {
  const { initView } = GStore();

  if (initView === "home") {
    return;
  }
  if (!String(initName).includes("Level")) {
    initProps.onHideLevel();
  }
}

export function useStore() {
  const { unmount } = GStore();

  const [props, setProps] = useState(defaultProps);
  initProps = props;
  putProps = setProps;
  useEffect(() => () => putProps(defaultProps), []);
  useEffect(() => {
    initProps = props;
  }, [props]);

  const [isShown, show] = useState(false);
  initShown = isShown;
  putShow = show;
  useEffect(() => unmount({ set: show, value: false }), [unmount]);
  useEffect(() => {
    initShown = isShown;
  }, [isShown]);

  const [name, setName] = useState(initTitle);
  initName = name;
  putName = setName;
  useEffect(() => unmount({ set: setName, value: initTitle }), [unmount]);
  useEffect(() => {
    initName = name;
  }, [name]);

  const [isStarted, start] = useState(false);
  initStarted = isStarted;
  putStart = start;
  useEffect(() => unmount({ set: start, value: false }), [unmount]);
  useEffect(() => {
    initStarted = isStarted;
  }, [isStarted]);

  const [count, setCount] = useState(0);
  initCount = count;
  putCount = setCount;
  useEffect(() => unmount({ set: setCount, value: 0 }), [unmount]);
  useEffect(() => {
    initCount = count;
  }, [count]);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    if (count > 0) {
      putShow(true);
      setTimeout(() => {
        putName(getCount({ count: initCount - 1 }));
        putCount(initCount - 1);
      }, 1000);
      return;
    }
    const { putShow: showPause } = PauseStore();
    const { putResize: resizeWheel, putDrag } = WheelStore();
    putShow(false);
    putDrag(false);
    resizeWheel(false);
    showPause(false);
    putStart(false);
  }, [count, isStarted]);

  useEffect(() => initProps.onAnimateWheel({ isStarted }), [isStarted]);

  return {
    className: useMemo(() => `${title} ${isShown && showTitle}`, [isShown]),
    name: initName,
    onTransitionEnd,
  };
}
export function useTitleStore() {
  return {
    initTitle,
    initShown,
    putShow,
    initName,
    putName,
    initCount,
    putCount,
    initStarted,
    putStart,
    getCount,
    initProps,
    putProps,
  };
}

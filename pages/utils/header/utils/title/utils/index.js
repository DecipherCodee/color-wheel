/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useGStore as GStore } from "../../../..";
import { usePauseStore as PauseStore } from "../../../../footer/utils/pause/utils";
import { useWheelStore as WheelStore } from "../../../../wheel/utils";
import styles from "./style.module.scss";

let initShown;
let putShow;
let initName;
let putName;
let initCount;
let putCount;
let initStarted;
let putStart;
let initProps;
let putProps;

export const defaultProps = { onHideLevel: null, onAnimateWheel: null };
const initTitle = "Level 1";
const { title, show: showTitle } = styles;

function getCount({ count }) {
  if (count < 60) {
    return `0:${`0${count}`.slice(-2)}`;
  }
  return "1:00";
}
export function onTransitionEnd({ initView, name }) {
  if (initView === "home") {
    return;
  }
  if (!String(name).includes("Level")) {
    initProps.onHideLevel();
  }
}
export function animateWheel({ isStarted, onAnimateWheel }) {
  if (!onAnimateWheel) {
    return;
  }
  onAnimateWheel({ isStarted });
}
export function updateProps({ props, setProps }) {
  initProps = props;
  if (setProps) {
    putProps = setProps;
  }
}
export function updateShown({ isShown, show }) {
  initShown = isShown;
  if (show) {
    putShow = show;
  }
}
export function updateName({ name, setName }) {
  initName = name;
  if (setName) {
    putName = setName;
  }
}
export function updateStarted({ isStarted, start }) {
  initStarted = isStarted;
  if (start) {
    putStart = start;
  }
}
export function updateCount({ count, setCount }) {
  initCount = count;
  if (setCount) {
    putCount = setCount;
  }
}
export function countTime({ setCount }) {
  putName(getCount({ count: initCount - 1 }));
  setCount(initCount - 1);
}
export function checkCounter({ count, isStarted }) {
  if (!isStarted) {
    return;
  }
  if (count > 0) {
    putShow(true);
    setTimeout(countTime.bind(null, { setCount: putCount }), 1000);
    return;
  }
  putShow(false);
  putStart(false);

  const { putShow: showPause = () => {} } = PauseStore();
  showPause(false);
  const {
    putResize: resizeWheel = () => {},
    putDrag = () => {},
  } = WheelStore();
  putDrag(false);
  resizeWheel(false);
}

export function useStore() {
  const { unmount, initView } = GStore();

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(unmount.bind(null, { set: putProps, value: defaultProps }), [
    unmount,
  ]);
  useEffect(updateProps.bind(null, { props }), [props]);

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(unmount.bind(null, { set: putShow, value: false }), [unmount]);
  useEffect(updateShown.bind(null, { isShown }), [isShown]);

  const [name, setName] = useState(initTitle);
  updateName({ name, setName });
  useEffect(unmount.bind(null, { set: putName, value: initTitle }), [unmount]);
  useEffect(updateName.bind(null, { name }), [name]);

  const [isStarted, start] = useState(false);
  updateStarted({ isStarted, start });
  useEffect(unmount.bind(null, { set: putStart, value: false }), [unmount]);
  useEffect(updateStarted.bind(null, { isStarted }), [isStarted]);

  const [count, setCount] = useState(0);
  updateCount({ count, setCount });
  useEffect(unmount.bind(null, { set: putCount, value: 0 }), [unmount]);
  useEffect(updateCount.bind(null, { count }), [count]);

  useEffect(checkCounter.bind(null, { count, isStarted }), [count, isStarted]);

  useEffect(
    animateWheel.bind(null, {
      isStarted,
      onAnimateWheel: initProps?.onAnimateWheel,
    }),
    [isStarted]
  );

  return {
    className: useMemo(() => `${title} ${isShown && showTitle}`, [isShown]),
    name: initName,
    onTransitionEnd: onTransitionEnd.bind(null, { initView, name: initName }),
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

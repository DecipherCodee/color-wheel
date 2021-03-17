import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useProps as appProps } from "../../../../..";
import { useProps as wheelProps } from "../../../../../wheel/utils";
import { useProps as pauseProps } from "../../../../footer/utils/pause/utils";

let initShown;
let putShow;
let initName;
let putName;
let initCount;
let putCount;
let initStarted;
let putStart;

const { title, show: showTitle } = styles;

function getCount({ count }) {
  if (count < 60) {
    return `0:${`0${count}`.slice(-2)}`;
  }
  return "1:00";
}

function reset({ time, name }) {
  if (time && !name) {
    putCount(time);
    putName(getCount({ count: time }));
    putStart(true);
  }
  if (name && !time) {
    putCount(0);
    putName(name);
    putStart(false);
  }
  putShow(true);
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

  const { putShow: showPause } = pauseProps();
  showPause(false);

  const { putResize, putDrag, animation, putFlip } = wheelProps();
  animation.start("flipped");
  putDrag(false);
  putFlip(true);
  putResize(false);
}

function updateTitle({ name }) {
  putName(name);
  putShow(true);
}
function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}
function updateName({ name, setName }) {
  if (initName !== name) {
    initName = name;
  }
  if (setName && putName !== setName) {
    putName = setName;
  }
}
function updateStarted({ isStarted, start }) {
  if (initStarted !== isStarted) {
    initStarted = isStarted;
  }
  if (start && putStart !== start) {
    putStart = start;
  }
}
function updateCount({ count, setCount }) {
  if (initCount !== count) {
    initCount = count;
  }
  if (setCount && putCount !== setCount) {
    putCount = setCount;
  }
}

export function useStore() {
  const { unmount } = appProps();

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [name, setName] = useState("Level 1");
  updateName({ name, setName });
  useEffect(() => unmount({ set: putName }), [unmount]);
  useEffect(() => updateName({ name }), [name]);

  const [isStarted, start] = useState(false);
  updateStarted({ isStarted, start });
  useEffect(() => unmount({ set: putStart }), [unmount]);
  useEffect(() => updateStarted({ isStarted }), [isStarted]);

  const [count, setCount] = useState(0);
  updateCount({ count, setCount });
  useEffect(() => unmount({ set: putCount }), [unmount]);
  useEffect(() => updateCount({ count }), [count]);

  useEffect(() => checkCounter({ count, isStarted }), [count, isStarted]);

  return {
    name,
    className: useMemo(() => `${title} ${isShown && showTitle}`, [isShown]),
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initName,
    putName,
    initCount,
    putCount,
    initStarted,
    putStart,
    reset,
    getCount,
    updateTitle,
  };
}

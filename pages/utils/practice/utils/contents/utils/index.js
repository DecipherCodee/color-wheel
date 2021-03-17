import { useEffect, useMemo, useState } from "react";
import colorName from "color-namer";
import { useProps as practiceProps } from "../..";
import { useProps as appProps } from "../../../..";
import styles from "./style.module.scss";
import { useColor } from "../../../../color";
import { useProps as wheelProps } from "../../../../wheel/utils";
import { useProps as wheelContentsProps } from "../../../../wheel/utils/contents/utils";
import { useProps as colorListProps } from "../../../../wheel/utils/contents/utils/tools/color-list/utils";
import { useProps as titleProps } from "../../../../layout/header/utils/title/utils";
import { useProps as panel1Props } from "../../../../../level/1/utils/panel/utils";

let initColors = {};
let putColors;
let initShown = false;
let putShow;
let initDone;
let putDone;
let initIndex = 0;
let putIndex;
let initViewed;
let putView;

const { contents, hide } = styles;
const numberOfColors = 6;
const verticalPosition = ["top", "bottom"];
const horizontalPosition = ["left", "right"];

function pickPosition() {
  const vertical =
    verticalPosition[Math.floor(Math.random() * verticalPosition.length)];

  const horizontal =
    horizontalPosition[Math.floor(Math.random() * horizontalPosition.length)];

  return { vertical, horizontal };
}
export function isColor({ colors, getColor }) {
  return Object.keys(colors).find((color) => {
    const { background } = colors[color];
    return background === getColor;
  });
}
export function isPosition({ getValue, colors, getPosition }) {
  return Object.keys(colors).find((color) => {
    const { position } = colors[color];

    return (
      position[getPosition] ===
      `${getValue}${
        getPosition === "top" || getPosition === "bottom" ? "vh" : "vw"
      }`
    );
  });
}

function getRandomPosition() {
  return Math.floor(Math.random() * 40);
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function onAnimationEnd() {
  if (initShown) {
    return;
  }
  if (initViewed) {
    const { putMount } = practiceProps();
    putMount(false);
  }
  if (!initViewed && initDone) {
    putView(true);
    putShow(true);
  }
  if (initDone) {
    initIndex = 0;
    initColors = {};
    putColors({});
    putDone(false);
  }
}
export function onDrag({ clientX, clientY }) {
  const { findElement } = appProps();
  findElement({ clientX, clientY, colors: initColors, putColors, putIndex });
}
export function onAllFocused() {
  const { isAllUnfocused } = appProps();
  return isAllUnfocused({ colors: initColors });
}
export function onRestart() {
  const { reset: resetTile } = titleProps();
  resetTile({ name: "Practice" });

  putShow(false);
  putView(false);

  const { reset: resetWheel } = wheelProps();
  resetWheel({ putIndex });
}
export function onQuit() {
  const { putName } = titleProps();
  const { slideIn } = panel1Props();

  putName("Level 1");
  slideIn({ time: 600 });
  const { reset: resetWheel } = wheelProps();
  resetWheel({ putIndex });
}

export function whilePosition({ colors, value, getPosition }) {
  let thisValue = value;

  while (isPosition({ colors, getValue: thisValue, getPosition })) {
    thisValue = getRandomPosition();
  }
  return thisValue;
}
export function whileColor({ colors, background }) {
  let thisValue = background;

  while (isColor({ colors, getColor: thisValue })) {
    thisValue = getRandomColor();
  }
  return thisValue;
}

export function checkBackground({ colors }) {
  const background = getRandomColor();

  return whileColor({ colors, background });
}
export function checkPosition({ colors, getPosition }) {
  const value = getRandomPosition();

  return whilePosition({ colors, value, getPosition });
}
export function checkShown({ isShown }) {
  if (!isShown) {
    return;
  }
  const { putProps: setWheelProps } = wheelProps();
  setWheelProps({
    onDrag,
  });
}
export function checkColors({ colors }) {
  if (Object.keys(colors).length > 0) {
    const { putColors: setColorList } = colorListProps();
    const { isAllUnfocused } = appProps();
    setColorList({ colors });

    if (isAllUnfocused({ colors })) {
      return;
    }
    putDone(true);
    const { onGameOver } = wheelProps();
    onGameOver();
    return;
  }
  putColors(() => {
    let value = {};

    for (let i = 0; i < numberOfColors; i += 1) {
      const background = checkBackground({ colors: value });
      const { vertical, horizontal } = pickPosition();
      const verticalValue = checkPosition({
        colors: value,
        getPosition: vertical,
      });
      const horizontalValue = checkPosition({
        colors: value,
        getPosition: horizontal,
      });
      const { name } = colorName(background).html[0];

      value = {
        ...value,
        [name]: {
          background,
          isFocused: false,
          index: 20,
          position: {
            [vertical]: `${verticalValue}vh`,
            [horizontal]: `${horizontalValue}vw`,
          },
        },
      };
    }
    return value;
  });
}

function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}
function updateColors({ colors, setColors }) {
  if (initColors !== colors) {
    initColors = colors;
  }
  if (setColors && putColors !== setColors) {
    putColors = setColors;
  }
}
function updateDone({ isDone, done }) {
  if (initDone !== isDone) {
    initDone = isDone;
  }
  if (done && putDone !== done) {
    putDone = done;
  }
}
function updateIndex({ index, setIndex }) {
  if (initIndex !== index) {
    initIndex = index;
  }
  if (setIndex && putIndex !== setIndex) {
    putIndex = setIndex;
  }
}
function updateViewed({ isViewed, view }) {
  if (initViewed !== isViewed) {
    initViewed = isViewed;
  }
  if (view && putView !== view) {
    putView = view;
  }
}

export function useStore() {
  const { unmount } = appProps();

  const [isViewed, view] = useState(true);
  updateViewed({ isViewed, view });
  useEffect(() => unmount({ set: view }), [unmount]);
  useEffect(() => updateViewed({ isViewed }), [isViewed]);

  const [colors, setColors] = useState(initColors);
  updateColors({ colors, setColors });
  useEffect(() => unmount({ set: setColors }), [unmount]);
  useEffect(() => updateColors({ colors }), [colors]);

  const [isShown, show] = useState(true);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: show }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [isDone, done] = useState(false);
  updateDone({ isDone, done });
  useEffect(() => unmount({ set: done }), [unmount]);
  useEffect(() => updateDone({ isDone }), [isDone]);

  const [index, setIndex] = useState(initIndex);
  updateIndex({ index, setIndex });
  useEffect(() => unmount({ set: setIndex }), [unmount]);
  useEffect(() => updateIndex({ index }), [index]);

  useEffect(() => {
    const { putRestart, putQuit, putAllUnfocused } = wheelContentsProps();
    putRestart({ onRestart });
    putQuit({ onQuit });
    putAllUnfocused({ onAllFocused });

    const { putTag } = wheelContentsProps();
    putTag({ tag: "practice" });
  }, []);

  useEffect(() => checkColors({ colors }), [colors]);

  useEffect(() => checkShown({ isShown }), [isShown]);

  return {
    colors,
    Color: useColor,
    onAnimationEnd,
    className: useMemo(() => `${contents} ${!isShown && hide}`, [isShown]),
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initColors,
    putColors,
    initDone,
    putDone,
    initViewed,
    putView,
  };
}

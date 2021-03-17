import { useEffect, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { useProps as appProps } from "../../../../../utils";
import { useColor } from "../../../../../utils/color";
import { useProps as titleProps } from "../../../../../utils/layout/header/utils/title/utils";
import { useProps as wheelProps } from "../../../../../utils/wheel/utils";
import { useProps as wheelContentsProps } from "../../../../../utils/wheel/utils/contents/utils";
import { useProps as ColorListProps } from "../../../../../utils/wheel/utils/contents/utils/tools/color-list/utils";
import { useProps as RecordListProps } from "../../../../../utils/wheel/utils/contents/utils/tools/record-list/utils";
import { useProps as Level1Props } from "../..";
import { useProps as pauseProps } from "../../../../../utils/layout/footer/utils/pause/utils";

let initColors;
let putColors;
let initIndex;
let putIndex;

const useColors = dynamic(() => import("..").then((mod) => mod.useColors));
const time = 20;
export const defaultColors = {
  aliceblue: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "1.4vh", left: "1.4vw" },
  },
  bisque: {
    isFocused: false,
    index: 20,
    record: null,
    position: { bottom: "14vh", left: "14vw" },
  },
  crimson: {
    isFocused: false,
    index: 20,
    record: null,
    position: { bottom: "50vh", right: "1.4vw" },
  },
  dodgerblue: {
    isFocused: false,
    index: 20,
    record: null,
    position: { bottom: "1.4vh", left: "14vw" },
  },
  gainsboro: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "50vh", right: "45vw" },
  },
  honeydew: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "20vh", left: "20vw" },
  },
  indianred: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "1vh", right: "34vw" },
  },
  khaki: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "49vh", left: "0" },
  },
  lavender: {
    isFocused: false,
    index: 20,
    record: null,
    position: { bottom: "20vh", right: "0.1vw" },
  },
  magenta: {
    isFocused: false,
    index: 20,
    record: null,
    position: { bottom: "2vh", right: "2vw" },
  },
  navajowhite: {
    isFocused: false,
    index: 20,
    record: null,
    position: { top: "10vh", right: "10vw" },
  },
};

export function onTransitionEnd({ set, value }) {
  const { initShown: is1Shown, putShow: show1 } = Level1Props();

  if (is1Shown) {
    return;
  }
  set(value);

  if (value !== "/") {
    show1(true);
  }
}
export function onAllFocused() {
  const { isAllUnfocused } = appProps();
  return isAllUnfocused({ colors: initColors });
}
export function onRestart() {
  const { reset: resetTile } = titleProps();
  resetTile({ time });

  const { putShow: show1, putProps: set1Props } = Level1Props();
  show1(false);
  set1Props({
    onTransitionEnd: onTransitionEnd.bind(null, {
      set: putColors,
      value: defaultColors,
    }),
  });

  const { reset: resetWheel } = wheelProps();
  resetWheel({ putIndex });

  const { putMount: mountPause } = pauseProps();
  mountPause(true);
}
export function onQuit() {
  const { putShow: show1, putProps: set1Props } = Level1Props();
  show1(false);
  set1Props({
    onTransitionEnd: onTransitionEnd.bind(null, {
      set: Router.push,
      value: "/",
    }),
  });
  const { reset: resetWheel } = wheelProps();
  resetWheel({ putIndex });

  const { putShow: showPause } = pauseProps();
  showPause(false);
}
export function onDrag({ clientX, clientY }) {
  const { findElement } = appProps();
  const { initStarted } = titleProps();

  if (!initStarted) {
    return null;
  }
  findElement({
    clientX,
    clientY,
    colors: initColors,
    putColors,
    putIndex,
    TitleStore: titleProps,
  });
  return undefined;
}

export function checkColors({ colors }) {
  const { putColors: setRecordList } = RecordListProps();
  const { isAllUnfocused } = appProps();
  setRecordList({ colors });

  if (isAllUnfocused({ colors })) {
    return;
  }
  const { onGameOver } = wheelProps();
  onGameOver();
  const { putStart, putCount, putName, getCount } = titleProps();
  putCount(0);
  putName(getCount({ count: 0 }));
  putStart(false);

  const { putShow: showPause } = pauseProps();
  showPause(false);
}

function updateColors({ colors, setColors }) {
  if (initColors !== colors) {
    initColors = colors;
  }
  if (setColors && putColors !== setColors) {
    putColors = setColors;
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

export function useStore() {
  const { unmount } = appProps();

  const [colors, setColors] = useState(defaultColors);
  updateColors({ colors, setColors });
  useEffect(() => unmount({ set: setColors }), [unmount]);
  useEffect(() => updateColors({ colors }), [colors]);

  const [index, setIndex] = useState(0);
  updateIndex({ index, setIndex });
  useEffect(() => unmount({ set: setIndex }), [unmount]);
  useEffect(() => updateIndex({ index }), [index]);

  useEffect(() => checkColors({ colors }), [colors]);

  useEffect(() => {
    const { putProps: setWheelProps } = wheelProps();
    setWheelProps({
      onDrag,
    });
    const { putRestart, putQuit, putAllUnfocused } = wheelContentsProps();
    putRestart({ onRestart });
    putQuit({ onQuit });
    putAllUnfocused({ onAllFocused });

    const { putTag } = wheelContentsProps();
    putTag({ tag: "level" });

    const { putColors: setColorList } = ColorListProps();
    setColorList({ colors: initColors });
    const { reset: resetTile } = titleProps();
    resetTile({ time });

    const { putMount: mountPause } = pauseProps();
    mountPause(true);
  }, []);

  return { Color: useColor, colors };
}
export function useProps() {
  return {
    useColors,
    defaultColors,
    initColors,
    putColors,
  };
}

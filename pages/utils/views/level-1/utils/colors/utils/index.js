import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGStore as GStore } from "../../../../..";
import { usePauseStore as PauseStore } from "../../../../../footer/utils/pause/utils";
import { useTitleStore as TitleStore } from "../../../../../header/utils/title/utils";
import { useWheelStore as WheelStore } from "../../../../../wheel/utils";
import { useViewsStore } from "../../../../utils";

let initColours;
let putColours = () => {};

const useColours = dynamic(() => import("..").then((mod) => mod.useColours));
const defaultColors = {
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

function getNearestElement({ clientX, clientY }) {
  const nearestElements = document.elementsFromPoint(clientX, clientY);
  const { putIndex } = GStore();

  if (!nearestElements.length > 0 && !Object.keys(initColours).length > 0) {
    return;
  }
  nearestElements.forEach((element) => {
    Object.keys(initColours).find((color) => {
      if (element.closest(`.${color}`)) {
        putIndex((old) => {
          if (!initColours[color].isFocused) {
            const index = old + 1;
            putColours({
              ...initColours,
              [color]: {
                ...initColours[color],
                index,
              },
            });
            return index;
          }
          return old;
        });
        putColours((old) => {
          if (!initColours[color].isFocused) {
            const { initName: record } = TitleStore();

            return {
              ...initColours,
              [color]: {
                ...initColours[color],
                record,
              },
            };
          }
          return old;
        });
        putColours({
          ...initColours,
          [color]: {
            ...initColours[color],
            isFocused: true,
          },
        });
      }
      return null;
    });
  });
}
function onDrag({ clientX, clientY }) {
  const { initStarted } = TitleStore();
  if (!initStarted) {
    return;
  }
  getNearestElement({ clientX, clientY });
}
function onFocusAll() {
  const { initView } = GStore();
  if (initView.includes("1")) {
    const { putFocusAll } = WheelStore();
    if (
      Object.keys(initColours).find(
        (colour) => initColours[colour].isFocused === false
      )
    ) {
      putFocusAll(false);
    } else {
      putFocusAll(true);
    }
  }
}
function useColorList() {
  return Object.keys(initColours).map((colours) => (
    <li key={colours}>{colours}</li>
  ));
}
function useRecordList() {
  return Object.keys(initColours).map((colours) => {
    const { record } = initColours[colours];

    return <li key={colours + record}>{!record ? "—" : record}</li>;
  });
}
function onContent() {
  return { useColorList, useRecordList };
}

export function useStore() {
  useEffect(() => {
    const { putProps } = WheelStore();
    putProps((old) => ({
      ...old,
      onDrag,
      onFocusAll,
      onContent,
    }));
  }, []);
  const { unmount } = GStore();

  const [colors, setColors] = useState(defaultColors);
  initColours = colors;
  putColours = setColors;
  useEffect(() => unmount({ set: putColours, value: defaultColors }), [
    unmount,
  ]);
  useEffect(() => {
    initColours = colors;
  }, [colors]);

  const { useColor } = useViewsStore();

  useEffect(() => {
    if (
      Object.keys(colors).find(
        (colour) => initColours[colour].isFocused === false
      )
    ) {
      return;
    }
    const { putShow: showPause } = PauseStore();
    const {
      putShow: showTitle,
      putStart,
      putCount,
      putName,
      getCount,
    } = TitleStore();

    showTitle(false);
    putCount(0);
    putName(getCount({ count: 0 }));

    const { putResize: resizeWheel, putDrag } = WheelStore();
    putDrag(false);
    resizeWheel(false);
    showPause(false);
    putStart(false);
  }, [colors]);

  return { initColours, Color: useColor };
}
export function useColorsStore() {
  return {
    useColours,
    defaultColors,
    initColours,
    putColours,
    getNearestElement,
  };
}

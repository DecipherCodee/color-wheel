import { useEffect, useMemo, useState } from "react";
import { useGStore as GStore } from "../../../..";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { usePanelStore as Level1PanelStore } from "../../../../views/level-1/utils/panel/utils";
import { usePanelStore as Level2PanelStore } from "../../../../views/level-2/utils/panel/utils";
import { useViewsStore } from "../../../../views/utils";
import { useWheelStore as WheelStore } from "../../../../wheel/utils";
import { useRightStore as RightStore } from "../../right/utils";
import styles from "./style.module.scss";

let initMounted;
let putMount = () => {};
let initShown;
let putShow = () => {};
let initColors;
let putColors = () => {};
let initHidden;
let putHide = () => {};

const numberOfColors = 6;
const { practice, show: showPractice, hide: hidePractice } = styles;
const verticalPosition = ["top", "bottom"];
const horizontalPosition = ["left", "right"];

function pickPosition() {
  const vertical =
    verticalPosition[Math.floor(Math.random() * verticalPosition.length)];

  const horizontal =
    horizontalPosition[Math.floor(Math.random() * horizontalPosition.length)];

  return { vertical, horizontal };
}
function getRandomPosition() {
  return Math.floor(Math.random() * 90);
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function onTransitionEnd() {
  if (initHidden) {
    putColors({});

    const { initQuitted, putQuit, putResize } = WheelStore();
    const { putShow: showTitle, putName } = TitleStore();

    putMount(false);
    showTitle(true);
    putHide(false);

    if (initQuitted) {
      putResize(false);
      putQuit(false);
      showTitle(false);

      setTimeout(() => {
        putName("Level 1");
        showTitle(true);
      }, 400);

      const { animation: level1PanelStoreAnimation } = Level1PanelStore();
      level1PanelStoreAnimation.start("current");

      const { putView: viewLevel2Panel } = Level2PanelStore();
      viewLevel2Panel(false);

      const { putShow: showRight } = RightStore();
      showRight(true);

      return;
    }
    putMount(true);
  }
  if (initShown) {
    return;
  }
  putMount(false);
}
function isColor({ colors, getColor }) {
  return Object.keys(colors).find((color) => {
    const { background } = colors[color];
    return background === getColor;
  });
}
function checkColors({ colors }) {
  let background = getRandomColor();

  while (isColor({ colors, getColor: background })) {
    background = getRandomColor();
  }

  return background;
}
function isPosition({ getValue, colors, getPosition }) {
  return Object.keys(colors).find((color) => {
    const { position } = colors[color];

    return (
      position[getPosition] ===
      `${getValue}${getPosition === ("top" || "bottom") ? "vh" : "vw"}`
    );
  });
}
function checkPosition({ colors, getPosition }) {
  let value = getRandomPosition();

  while (isPosition({ colors, getValue: value, getPosition })) {
    value = getRandomPosition();
  }
  return value;
}
function getNearestElement({ clientX, clientY }) {
  const nearestElements = document.elementsFromPoint(clientX, clientY);
  const { putIndex } = GStore();

  if (!nearestElements.length > 0 && !Object.keys(initColors).length > 0) {
    return;
  }
  nearestElements.forEach((element) => {
    Object.keys(initColors).find((color) => {
      if (element.closest(`.${color}`)) {
        putIndex((old) => {
          if (!initColors[color].isFocused) {
            const index = old + 1;
            putColors({
              ...initColors,
              [color]: {
                ...initColors[color],
                index,
              },
            });
            return index;
          }
          return old;
        });

        putColors({
          ...initColors,
          [color]: {
            ...initColors[color],
            isFocused: true,
          },
        });
      }
      return null;
    });
  });
}
function onDrag({ clientX, clientY }) {
  getNearestElement({ clientX, clientY });
}
function useRender({ className, isMounted, colors }) {
  const { useColor: Color } = useViewsStore();

  return (
    isMounted && (
      <main className={className} onTransitionEnd={onTransitionEnd}>
        {Object.keys(colors).map((color) => {
          const { index, position, isFocused, background } = colors[color];

          return (
            <Color
              name={color}
              key={color}
              index={index}
              opacity="1"
              background={background}
              position={position}
              isFocused={isFocused}
            />
          );
        })}
      </main>
    )
  );
}
function useColorList() {
  return Object.keys(initColors).map((colours) => (
    <li key={colours}>{colours}</li>
  ));
}
function useRecordList() {
  return Object.keys(initColors).map((colours) => {
    const { record } = initColors[colours];

    return <li key={colours + record}>{!record ? "—" : record}</li>;
  });
}
function onContent() {
  return { useColorList, useRecordList };
}
function onRestartLevel() {
  putHide(true);
}

export function useStore() {
  const [colors, setColors] = useState({});
  initColors = colors;
  putColors = setColors;
  useEffect(() => () => putColors({}), []);
  useEffect(() => {
    initColors = colors;
  }, [colors]);

  const [isHidden, hide] = useState(false);
  initHidden = isHidden;
  putHide = hide;
  useEffect(() => () => putHide(false), []);
  useEffect(() => {
    initHidden = isHidden;
  }, [isHidden]);

  const [isShown, show] = useState(false);
  initShown = isShown;
  putShow = show;
  useEffect(() => () => putShow(false), []);
  useEffect(() => {
    initShown = isShown;
  }, [isShown]);

  const [isMounted, mount] = useState(false);
  initMounted = isMounted;
  putMount = mount;
  useEffect(() => () => putMount(false), []);
  useEffect(() => {
    initMounted = isMounted;
  }, [isMounted]);

  useEffect(() => {
    if (Object.keys(colors).length > 0) {
      return;
    }
    putColors(() => {
      let value = {};

      for (let i = 0; i < numberOfColors; i += 1) {
        const background = checkColors({ colors: value });
        const { vertical, horizontal } = pickPosition();
        const verticalValue = checkPosition({
          colors: value,
          getPosition: vertical,
        });
        const horizontalValue = checkPosition({
          colors: value,
          getPosition: horizontal,
        });

        value = {
          ...value,
          [`color${i + 1}`]: {
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
  }, [colors]);

  useEffect(() => {
    if (!isShown) {
      return;
    }
    const { putIndex } = GStore();
    putIndex(0);

    const { putProps: putWheelProps } = WheelStore();
    putWheelProps((old) => ({
      ...old,
      onDrag,
      onContent,
      onRestartLevel,
    }));
  }, [isShown]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    putShow(true);
  }, [isMounted]);

  useEffect(() => {
    if (!Object.keys(initColors).length > 0) {
      return;
    }
    if (
      Object.keys(initColors).find((colour) => !initColors[colour].isFocused)
    ) {
      return;
    }
    const { putFlip, animate, putDrag, putResize } = WheelStore();

    animate.start("flipped");
    putDrag(false);
    putResize(false);
    putFlip(true);
  }, [colors]);

  const { useColor } = useViewsStore();

  return {
    isMounted: initMounted,
    Color: useColor,
    colors: initColors,
    className: useMemo(
      () =>
        `${practice} ${isShown && showPractice} ${isHidden && hidePractice}`,
      [isShown, isHidden]
    ),
    Render: useRender,
  };
}
export function usePracticeStore() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    initHidden,
    putHide,
  };
}

import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useGStore as GStore } from "../../..";
import { useWheelStore as WheelStore } from "../../../wheel/utils";
import { useColorsStore as ColorsStore } from "./colors/utils";
import { useTitleStore as TitleStore } from "../../../header/utils/title/utils";

let initHidden;
let putHide = () => {};
let initMounted;
let putMount = () => {};

const { level1, hide: hideLevel1 } = styles;
const time = 20;

function onTransitionEnd() {
  if (!initHidden) {
    return;
  }
  const { putColours, defaultColors } = ColorsStore();
  putColours(defaultColors);
  putMount(false);
  putMount(true);
  const { initQuitted, putQuit } = WheelStore();

  if (initQuitted) {
    putQuit(false);
    const { putView } = GStore();
    putView("home");
  }
}
function useRender({ className, isMounted }) {
  const { useColours: Colours } = ColorsStore();

  return (
    isMounted && (
      <main className={className} onTransitionEnd={onTransitionEnd}>
        <Colours />
      </main>
    )
  );
}
function onHideLevel() {
  const {
    putName,
    getCount,
    putStart,
    putCount,
    initShown: isTitleShown,
  } = TitleStore();
  const { initView } = GStore();
  if (!isTitleShown && initView === "level1") {
    putCount(time);
    putName(getCount({ count: time }));
  }
  if (initHidden) {
    putHide(false);
    putStart(true);
  }
}
function onAnimateWheel({ isStarted }) {
  const { animate, putFlip, putResize: resizeWheel, putDrag } = WheelStore();
  const { initView } = GStore();

  if (
    !isStarted &&
    isStarted !== (null || undefined) &&
    initView !== "home" &&
    initView !== (null || undefined) &&
    !initHidden
  ) {
    setTimeout(() => putFlip(true), 100);
    animate.start("flipped");
    putDrag(false);
    resizeWheel(false);
  }
}
function onRestartLevel() {
  putHide(true);
}

export function useStore() {
  useEffect(() => {
    const { putProps } = TitleStore();
    putProps((old) => ({
      ...old,
      onHideLevel,
      onAnimateWheel,
    }));
    const { putProps: putWheelProps } = WheelStore();
    putWheelProps((old) => ({
      ...old,
      onRestartLevel,
    }));
  }, []);

  useEffect(() => {
    const {
      putShow: showTitle,
      putName,
      putCount,
      getCount,
      putStart,
    } = TitleStore();
    putCount(time);
    putName(getCount({ count: time }));
    showTitle(true);
    putStart(true);
  }, []);

  const { unmount } = GStore();

  const [isHidden, hide] = useState(false);
  initHidden = isHidden;
  putHide = hide;
  useEffect(() => unmount({ set: putHide, value: false }), [unmount]);
  useEffect(() => {
    initHidden = isHidden;
  }, [isHidden]);

  const [isMounted, mount] = useState(true);
  initMounted = isMounted;
  putMount = mount;
  useEffect(() => unmount({ set: putMount, value: true }), [unmount]);
  useEffect(() => {
    initMounted = isMounted;
  }, [isMounted]);

  return {
    Render: useRender,
    className: useMemo(() => `${level1} ${isHidden && hideLevel1}`, [isHidden]),
    isMounted: initMounted,
  };
}
export function useLevel1Store() {
  const {
    getNearestElement,
    initColours,
    putColours,
    defaultColors,
  } = ColorsStore();

  return {
    getNearestElement,
    time,
    initColours,
    putColours,
    initHidden,
    putHide,
    defaultColors,
  };
}

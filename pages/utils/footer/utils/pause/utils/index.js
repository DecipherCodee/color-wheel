/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useGStore } from "../../../..";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { useWheelStore as WheelStore } from "../../../../wheel/utils";
import styles from "./style.module.scss";

let initShown;
let putShow;
let initMounted;
let putMount;
let className;

const { pause, show: showPause } = styles;

export function onAnimationEnd() {
  if (initShown) {
    return;
  }
  putMount(false);
}
export function checkStarted({ initStarted, putFlip, animate, putDrag }) {
  if (!initStarted) {
    putFlip(false);
    animate.start("unflipped");
    putDrag(true);
  }
}
export function updateCount(old) {
  const { putCount = () => {} } = TitleStore();
  if (old) {
    putCount((count) => count + 1);
    return false;
  }
  return true;
}
function onClick() {
  const { putStart = () => {}, initStarted } = TitleStore();
  const {
    animate = { start: () => {} },
    putDrag = () => {},
    putFlip = () => {},
  } = WheelStore();

  checkStarted({ initStarted, putFlip, animate, putDrag });

  putStart(updateCount);
}
export function useRender() {
  return (
    initMounted && (
      <main
        aria-hidden="true"
        onClick={onClick}
        className={className}
        onAnimationEnd={onAnimationEnd}
      />
    )
  );
}
export function updateShown({ isShown, show }) {
  initShown = isShown;
  if (show) {
    putShow = show;
  }
}
export function updateMounted({ isMounted, mount }) {
  initMounted = isMounted;
  if (mount) {
    putMount = mount;
  }
}
export function checkMounted() {
  if (!initMounted) {
    return;
  }
  putShow(true);
}

export function useStore() {
  const { unmount } = useGStore();

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(unmount.bind(null, { set: show, value: false }), [unmount]);
  useEffect(updateShown.bind(null, { isShown }), [isShown]);

  const [isMounted, mount] = useState(false);
  updateMounted({ isMounted, mount });
  useEffect(unmount.bind(null, { set: mount, value: false }), [unmount]);
  useEffect(updateMounted.bind(null, { isMounted }), [isMounted]);

  useEffect(checkMounted, [isMounted]);

  className = useMemo(() => `${pause} ${isShown && showPause}`, [isShown]);

  return {
    Render: useRender,
  };
}
export function usePauseStore() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    onClick,
  };
}

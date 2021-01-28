import { useEffect, useMemo, useState } from "react";
import { useGStore } from "../../../..";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { useWheelStore as WheelStore } from "../../../../wheel/utils";
import styles from "./style.module.scss";

let initShown;
let putShow = () => {};
let initMounted;
let putMount = () => {};

const { pause, show: showPause } = styles;

function onAnimationEnd() {
  if (initShown) {
    return;
  }
  putMount(false);
}
function onClick() {
  const { putStart, putCount, initStarted } = TitleStore();
  const { animate, putDrag, putFlip } = WheelStore();

  if (!initStarted) {
    putFlip(false);
    animate.start("unflipped");
    putDrag(true);
  }
  putStart((old) => {
    if (old) {
      putCount((count) => count + 1);
      return false;
    }

    return true;
  });
}
function useRender({ className, isMounted }) {
  return (
    isMounted && (
      <main
        aria-hidden="true"
        onClick={onClick}
        className={className}
        onAnimationEnd={onAnimationEnd}
      />
    )
  );
}

export function useStore() {
  const { unmount } = useGStore();

  const [isShown, show] = useState(false);
  initShown = isShown;
  putShow = show;
  useEffect(() => unmount({ set: show, value: false }), [unmount]);
  useEffect(() => {
    initShown = isShown;
  }, [isShown]);

  const [isMounted, mount] = useState(false);
  initMounted = isMounted;
  putMount = mount;
  useEffect(() => unmount({ set: mount, value: false }), [unmount]);
  useEffect(() => {
    initMounted = isMounted;
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    putShow(true);
  }, [isMounted]);

  return {
    Render: useRender,
    className: useMemo(() => `${pause} ${isShown && showPause}`, [isShown]),
    isMounted: initMounted,
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

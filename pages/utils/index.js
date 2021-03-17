import dynamic from "next/dynamic";
import Head from "next/head";
import { createRef, useEffect, useMemo, useState } from "react";
import { useArrows } from "./arrows";
import { useLayout } from "./layout";
import { useProps as titleProps } from "./layout/header/utils/title/utils";
import styles from "./style.module.scss";
import { useProps as WheelProps } from "./wheel/utils";

let initShown = true;
let putShow;
let initProps;
let putProps;

const defaultProps = { onAnimationEnd: null };
const { home, hide } = styles;
const ref = createRef();

export const usePanel1 = dynamic(() =>
  import("../level/1/utils/panel").then((mod) => mod.usePanel)
);
export const usePanel2 = dynamic(() =>
  import("../level/2/utils/panel").then((mod) => mod.usePanel)
);
export const usePractice = dynamic(() =>
  import("./practice").then((mod) => mod.usePractice)
);

function unmount({ set, value }) {
  return () => set(value);
}

function checkMounted({ isMounted, put }) {
  if (!isMounted) {
    return;
  }
  put(true);
}
export function checkIndex({ colors, color, titleStore, putColors }, old) {
  if (!colors[color].isFocused) {
    const index = old + 1;
    let record;

    if (titleStore) {
      const { initName } = titleStore();
      record = initName;
    }
    putColors({
      ...colors,
      [color]: {
        ...colors[color],
        index,
        isFocused: true,
        record,
      },
    });
    return index;
  }
  return old;
}

function findElement({
  clientX,
  clientY,
  colors,
  putColors,
  TitleStore,
  putIndex,
}) {
  const nearestElements = document.elementsFromPoint(clientX, clientY);

  if (!nearestElements.length > 0 && !Object.keys(colors).length > 0) {
    return;
  }
  nearestElements.forEach((element) =>
    Object.keys(colors).find((color) => {
      if (element.closest(`.${color}`)) {
        putIndex(
          checkIndex.bind(this, {
            colors,
            color,
            titleStore: TitleStore,
            putColors,
          })
        );
      }
      return null;
    })
  );
}

function isAllUnfocused({ colors }) {
  return Object.keys(colors).find((color) => !colors[color].isFocused);
}

function onAnimationEnd({ isShown, putMount }) {
  if (isShown) {
    return;
  }
  putMount(false);
}

function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}
function updateProps({ props, setProps }) {
  if (initProps !== props) {
    initProps = props;
  }
  if (setProps && putProps !== setProps) {
    putProps = setProps;
  }
}

export function useStore() {
  const [isShown, show] = useState(true);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), []);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(() => unmount({ set: setProps }), []);
  useEffect(() => updateProps({ props }), [props]);

  useEffect(() => {
    const { reset: resetTitle } = titleProps();
    resetTitle({ name: "Level 1" });
  }, []);

  const { useLeft, useRight } = useArrows();

  return {
    Left: useLeft,
    Right: useRight,
    Panel1: usePanel1,
    Panel2: usePanel2,
    Practice: usePractice,
    onAnimationEnd: props?.onAnimationEnd,
    className: useMemo(() => `${home} ${!isShown && hide}`, [isShown]),
  };
}
export function useAppStore() {
  const { useFooter, useHeader } = useLayout();
  const { useWheel } = WheelProps();

  return { Footer: useFooter, Header: useHeader, Wheel: useWheel, Head, ref };
}
export function useProps() {
  return {
    ref,
    initShown,
    putShow,
    initProps,
    putProps,
    unmount,
    checkMounted,
    findElement,
    isAllUnfocused,
    onAnimationEnd,
  };
}

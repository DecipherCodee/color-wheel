import { useEffect, useState } from "react";
import { useProps as panel2Props } from "../..";
import { useProps as appProps } from "../../../../../../../utils";
import { useArrows as arrows } from "../../../../../../../utils/arrows";
import { useProps as leftProps } from "../../../../../../../utils/arrows/left/utils";
import { useProps as rightProps } from "../../../../../../../utils/arrows/right/utils";
import { useProps as titleProps } from "../../../../../../../utils/layout/header/utils/title/utils";
import { useProps as wheelProps } from "../../../../../../../utils/wheel/utils";
import { useProps as panel1Props } from "../../../../../../1/utils/panel/utils";
import { useLevel as useLevelProps } from "../../../../../../utils";
import styles from "./style.module.scss";

let initShown;
let putShow;
let initLeft = "100%";
function putLeft({ left }) {
  if (initLeft === left) {
    return null;
  }
  initLeft = left;
  return undefined;
}

const {
  swtach1Fill,
  swatch1Width,
  swatch1Top,
  swatch1Left,
  swatch1Transform,
  swtach2Fill,
  swatch2Width,
  swatch2Right,
  swatch2Bottom,
} = styles;
const swatch1 = {
  fill: swtach1Fill,
  width: swatch1Width,
  top: swatch1Top,
  left: swatch1Left,
  transform: swatch1Transform,
};
const swatch2 = {
  fill: swtach2Fill,
  width: swatch2Width,
  right: swatch2Right,
  bottom: swatch2Bottom,
};

function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}

export function onDrag(_, { point: { x } }) {
  const { ref: appRef } = appProps();
  const { putShow: showTitle, initShown: isTitle } = titleProps();
  const { putMount: mount1, initMounted } = panel1Props();

  const value = (x / appRef.current.clientWidth) * 100;

  if (!initMounted) {
    mount1(true);
  }
  if (isTitle) {
    if (value <= 40) {
      showTitle(false);
    }
    if (value >= 60) {
      showTitle(false);
    }
  }
}
export function onDragEnd(_, { point: { x } }) {
  const { ref: appRef } = appProps();
  const { updateTitle } = titleProps();
  const {
    animation: animation1,
    putView: view1,
    putShow: show1,
    putLeft: putLeft1,
  } = panel1Props();
  const { putView, animation } = panel2Props();
  const { putShow: showRight = () => {} } = rightProps();

  const value = (x / appRef.current.clientWidth) * 100;

  if (value > 80) {
    setTimeout(updateTitle.bind(null, { name: "Level 1" }), 400);
    putView(false);
    view1(true);
    showRight(true);
    putShow(false);
    putLeft({ left: "100%" });
    animation.start("right2");
    animation1.start("current");
  } else {
    setTimeout(updateTitle.bind(null, { name: "Level 2" }), 400);
    putView(true);
    view1(false);
    show1(false);
    putLeft1({ left: "-100%" });
    animation.start("current");
  }
}

export function checkViewed() {
  const { initViewed, animation, putView } = panel2Props();
  if (!initViewed) {
    return null;
  }
  const { putProps: setWheelProps } = wheelProps();
  setWheelProps({});
  animation.start("current");
  const { putView: view1, putMount: mount1, putLeft: putLeft1 } = panel1Props();
  const { onClick: onLeft, putProps: putLeftProps } = leftProps();

  const { putArrows } = arrows();
  putArrows({
    putProps: putLeftProps,
    onClick: onLeft,
    thisView: putView,
    nextView: view1,
    animate: animation.start,
    animateTo: "right2",
    mount: mount1,
    unmount: putShow,
    isLeft: true,
    isRight: true,
    title: "Level 1",
    position: putLeft1,
    positionTo: "-100%",
  });
  return undefined;
}

export function useStore() {
  const { unmount, onAnimationEnd } = appProps();

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  useEffect(() => putShow(true), []);

  useEffect(checkViewed);

  const { usePanel: Panel } = useLevelProps();
  const { animation, putMount } = panel2Props();

  return {
    Panel,
    isShown,
    swatch1,
    swatch2,
    left: initLeft,
    animation,
    onAnimationEnd: onAnimationEnd.bind(null, { isShown, putMount }),
    onDrag,
    onDragEnd,
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initLeft,
    putLeft,
  };
}

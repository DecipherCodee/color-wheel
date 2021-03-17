import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import Router from "next/router";
import styles from "./style.module.scss";
import { useProps as appProps } from "../../../../../utils";
import { useProps as leftProps } from "../../../../../utils/arrows/left/utils";
import { useProps as rightProps } from "../../../../../utils/arrows/right/utils";
import { useProps as practiceProps } from "../../../../../utils/practice/utils";
import { useProps as panel2Props } from "../../../../2/utils/panel/utils";
import { useProps as contents2Props } from "../../../../2/utils/panel/utils/contents/utils";
import { useArrows as arrows } from "../../../../../utils/arrows";
import { useLevel } from "../../../../utils";
import { useProps as titleProps } from "../../../../../utils/layout/header/utils/title/utils";
import { useProps as practiceContentsProps } from "../../../../../utils/practice/utils/contents/utils";
import { useProps as wheelProps } from "../../../../../utils/wheel/utils";

let animation;
let initShown;
let putShow;
let initMounted;
let putMount;
let initViewed;
let putView;
let initDragged;
let putDrag;
let initLeft = "unset";
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
const guide = { number: 11, time: "20 seconds" };

function updateView({ isViewed, view }) {
  if (initViewed !== isViewed) {
    initViewed = isViewed;
  }
  if (view && putView !== view) {
    putView = view;
  }
}
function updateDragged({ isDragged, drag }) {
  if (initDragged !== isDragged) {
    initDragged = isDragged;
  }
  if (drag && putDrag !== drag) {
    putDrag = drag;
  }
}
function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}
function updateMounted({ isMounted, mount }) {
  if (initMounted !== isMounted) {
    initMounted = isMounted;
  }
  if (mount && putMount !== mount) {
    putMount = mount;
  }
}

export function onAppAnimationEnd() {
  const { initShown: isAppShown } = appProps();
  if (isAppShown) {
    return null;
  }
  Router.push("/level/1");
  return undefined;
}
export function onDragStart() {
  const { putShow: showLeft } = leftProps();
  showLeft(false);
  const { putShow: showRight } = rightProps();
  showRight(false);

  const { putShow: showApp, putProps: setAppProps } = appProps();
  setAppProps({
    onAnimationEnd: onAppAnimationEnd,
  });
  showApp(false);

  const { putShow: showTitle } = titleProps();
  showTitle(false);
}

export function checkViewed({ isViewed }) {
  if (!isViewed) {
    return null;
  }
  const { putProps: setWheelProps } = wheelProps();
  setWheelProps({
    onDragStart,
  });
  animation?.start("current");
  const { putMount: mount2, putView: view2 } = panel2Props();
  const { putLeft: putLeft2 } = contents2Props();

  const { putArrows } = arrows();

  const { onClick: onLeft, putProps: putLeftProps } = leftProps();
  putArrows({
    putProps: putLeftProps,
    onClick: onLeft,
    thisView: putView,
    animate: animation?.start,
    animateTo: "right1",
    position: putLeft2,
    positionTo: "176%",
    isLeft: false,
    isRight: false,
    title: "Practice",
  });

  const { onClick: onRight, putProps: putRightProps } = rightProps();
  putArrows({
    putProps: putRightProps,
    onClick: onRight,
    thisView: putView,
    nextView: view2,
    animate: animation?.start,
    animateTo: "left",
    mount: mount2,
    unmount: putShow,
    isLeft: true,
    isRight: false,
    title: "Level 2",
    position: putLeft2,
    positionTo: "100%",
  });
  return undefined;
}
export function checkPracticeContents({ showPracticeContents }) {
  if (showPracticeContents) {
    return showPracticeContents(false);
  }
  return null;
}
export function checkPanel2View({ view2 }) {
  if (view2) {
    return view2(false);
  }
  return null;
}

function slideIn({ time }) {
  const { updateTitle } = titleProps();
  const { putShow: showLeft } = leftProps();
  const { putShow: showRight } = rightProps();
  const { putView: view2 } = panel2Props();
  const { putShow: showPracticeContents } = practiceContentsProps();
  const { putLeft: putLeft2, putShow: show2 } = contents2Props();

  setTimeout(updateTitle.bind(null, { name: "Level 1" }), time);
  if (showPracticeContents) {
    showPracticeContents(false);
  }
  showLeft(true);
  showRight(true);
  putView(true);
  checkPanel2View({ view2 });
  if (show2) {
    show2(false);
  }
  putLeft2({ left: "100%" });
  animation.start("current");
}

export function onDrag(_, { point: { x } }) {
  if (!initDragged) {
    putDrag(true);
  }
  const { ref: appRef } = appProps();
  const { putShow: showTitle, initShown: isTitle } = titleProps();
  const { putMount: mount2, initMounted: is2Mounted } = panel2Props();

  const value = (x / appRef.current.clientWidth) * 100;

  if (!is2Mounted) {
    mount2(true);
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
  const { animation: animation2, putView: view2 } = panel2Props();
  const { putShow: showLeft } = leftProps();
  const { putShow: showRight } = rightProps();
  const { putShow: show2, putLeft: putLeft2 } = contents2Props();
  const { putShow: showPracticeContents } = practiceContentsProps();

  const value = (x / appRef.current.clientWidth) * 100;

  if (value < 20) {
    setTimeout(updateTitle.bind(null, { name: "Level 2" }), 400);
    putView(false);
    view2(true);
    showLeft(true);
    showRight(false);
    checkPracticeContents({ showPracticeContents });
    animation.start("left");
    putShow(false);
    putLeft({ left: "-100%" });
    animation2.start("current");
  } else if (value > 80) {
    setTimeout(updateTitle.bind(null, { name: "Practice" }), 400);
    putView(false);
    view2(false);
    showRight(false);
    showLeft(false);
    show2(false);
    putLeft2({ left: "176%" });
    animation.start("right1");
  } else {
    slideIn({ time: 400 });
  }
}
export function onAnimationComplete() {
  if (initViewed) {
    return;
  }
  const { initViewed: is2Viewed } = panel2Props();
  const {
    putMount: mountPractice,
    initMounted: isPracticeMounted,
  } = practiceProps();
  if (!is2Viewed && !isPracticeMounted) {
    mountPractice(true);
  }
  if (initDragged) {
    putDrag(false);
  }
}
export function onTap() {
  if (initViewed || initDragged) {
    return;
  }
  const { putShow: showTitle } = titleProps();
  showTitle(false);
  slideIn({ time: 600 });
}

export function useStore() {
  const { unmount, checkMounted, onAnimationEnd } = appProps();

  const [isViewed, view] = useState(true);
  updateView({ isViewed, view });
  useEffect(() => unmount({ set: putView }), [unmount]);
  useEffect(() => updateView({ isViewed }), [isViewed]);

  const [isDragged, drag] = useState(false);
  updateDragged({ isDragged, drag });
  useEffect(() => unmount({ set: putDrag }), [unmount]);
  useEffect(() => updateDragged({ isDragged }), [isDragged]);

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [isMounted, mount] = useState(true);
  updateMounted({ isMounted, mount });
  useEffect(() => unmount({ set: putMount }), [unmount]);
  useEffect(() => updateMounted({ isMounted }), [isMounted]);

  useEffect(() => checkMounted({ isMounted, put: show }), [
    checkMounted,
    isMounted,
  ]);

  useEffect(() => checkViewed({ isViewed }), [isViewed]);

  animation = useAnimation();

  const { usePanel: Panel } = useLevel();

  return {
    Panel,
    isShown,
    isMounted,
    guide,
    swatch1,
    swatch2,
    animation,
    left: initLeft,
    onAnimationEnd: onAnimationEnd.bind(null, { isShown, putMount }),
    onAnimationComplete,
    onTap,
    onDrag,
    onDragEnd,
  };
}
export function useProps() {
  return {
    animation,
    initViewed,
    putView,
    initMounted,
    putMount,
    initShown,
    putShow,
    initDragged,
    putDrag,
    initLeft,
    putLeft,
    slideIn,
  };
}

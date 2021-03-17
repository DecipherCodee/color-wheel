import { motion, useAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useProps as appProps } from "../..";
import { useProps as titleProps } from "../../layout/header/utils/title/utils";
import styles from "./style.module.scss";

let animation;
let initDragged;
let putDrag;
let initResized;
let putResize;
let initFlipped;
let putFlip;
let initProps;
let putProps;

const useWheel = dynamic(() => import("..").then((mod) => mod.useWheel));
export const useContents = dynamic(() =>
  import("./contents").then((mod) => mod.useContents)
);
const defaultProps = {
  onDrag: null,
  onDragStart: null,
};
const { wheel, grab, flipWheel } = styles;
const transition = {
  type: "spring",
  duration: 0.6,
  mass: 0.2,
  damping: 9,
};

export function isWidth() {
  const { ref } = appProps();
  const appWidth = ref.current?.clientWidth;
  const appHeight = ref.current?.clientHeight;

  let width;
  let height;
  let y;

  if (appWidth >= 367) {
    width = 330;
    height = 365;
  } else {
    width = "80%";
    height = "50%";
  }
  if (appWidth >= 380) {
    y = -(appHeight / 2 - height / 2) / 2;
  } else {
    y = -40;
  }
  return { width, height, y };
}

function reset({ putIndex }) {
  animation.start("unflipped");
  setTimeout(animation.start.bind(null, "scaled"), 400);

  if (putIndex) {
    putIndex(0);
  }
  putFlip(false);
}

function onGameOver() {
  animation.start("flipped");
  putFlip(true);
  putDrag(false);
  putResize(false);
}
export function onFlip() {
  const { width, height, y } = isWidth();

  return {
    scale: 1,
    borderBottomRightRadius: "44%",
    borderTopRightRadius: "44%",
    borderTopLeftRadius: "44%",
    x: 0,
    y,
    width,
    height,
    rotateX: -180,
    rotateY: -180,
  };
}
export function onDragStart() {
  animation.start("resized");
  putResize(true);

  if (initProps.onDragStart) {
    initProps.onDragStart();
  }
}
export function onDragEnd() {
  putResize(false);
}

export function checkFlipped({ isFlipped }) {
  if (!isFlipped) {
    putDrag(true);
    return;
  }
  const { putShow: showTitle } = titleProps();
  showTitle(false);
}
export function checkWheel({ isResized, isDragged }) {
  if (!isResized && isDragged) {
    animation?.start("normal");
    animation?.start("scaled");
  }
  if (!isDragged) {
    animation?.start("normal");
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
function updateResized({ isResized, resize }) {
  if (initResized !== isResized) {
    initResized = isResized;
  }
  if (resize && putResize !== resize) {
    putResize = resize;
  }
}
function updateFlipped({ isFlipped, flip }) {
  if (initFlipped !== isFlipped) {
    initFlipped = isFlipped;
  }
  if (flip && putFlip !== flip) {
    putFlip = flip;
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
  const { ref, unmount } = appProps();

  const [isResized, resize] = useState(false);
  updateResized({ isResized, resize });
  useEffect(() => unmount({ set: resize }), [unmount]);
  useEffect(() => updateResized({ isResized }), [isResized]);

  const [isDragged, drag] = useState(true);
  updateDragged({ isDragged, drag });
  useEffect(() => unmount({ set: drag }), [unmount]);
  useEffect(() => updateDragged({ isDragged }), [isDragged]);

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(() => unmount({ set: setProps }), [unmount]);
  useEffect(() => updateProps({ props }), [props]);

  const [isFlipped, flip] = useState(false);
  updateFlipped({ isFlipped, flip });
  useEffect(() => unmount({ set: flip }), [unmount]);
  useEffect(() => updateFlipped({ isFlipped }), [isFlipped]);

  useEffect(() => checkWheel({ isDragged, isResized }), [isResized, isDragged]);

  useEffect(() => checkFlipped({ isFlipped }), [isFlipped]);

  animation = useAnimation();

  return {
    ref,
    motion,
    animation,
    transition,
    isFlipped,
    isDragged,
    Contents: useContents,
    onDrag: props?.onDrag,
    onDragStart,
    onDragEnd,
    className: useMemo(
      () => `${wheel} ${isResized && grab} ${isFlipped && flipWheel}`,
      [isResized, isFlipped]
    ),
    variants: useMemo(
      () => ({
        normal: {
          scale: 1,
          boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
          borderBottomRightRadius: "44%",
          borderTopRightRadius: "44%",
          borderTopLeftRadius: "44%",
        },
        resized: {
          scale: 0.5,
          boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.2)",
          borderBottomRightRadius: "50%",
          borderTopRightRadius: "50%",
          borderTopLeftRadius: "50%",
        },
        unflipped: {
          width: 66.4,
          height: 72.8,
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
        },
        flipped: onFlip,
        scaled: {
          scale: 0.8,
          transition: {
            duration: 0.7,
            repeatType: "mirror",
            repeat: Infinity,
          },
        },
      }),
      []
    ),
  };
}
export function useProps() {
  return {
    useWheel,
    animation,
    initFlipped,
    putFlip,
    initResized,
    putResize,
    initProps,
    putProps,
    initDragged,
    putDrag,
    reset,
    onGameOver,
  };
}

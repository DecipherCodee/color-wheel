import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useGStore as GStore } from "../../../../..";
import { useViewsStore } from "../../../../utils";
import { usePanelStore as Level1PanelStore } from "../../../../level-1/utils/panel/utils";
import { useLevelsStore as LevelsStore } from "../../../../../levels/utils";
import { useTitleStore as TitleStore } from "../../../../../header/utils/title/utils";
import styles from "./style.module.scss";
import { useRightStore as RightStore } from "../../../../../levels/utils/right/utils";
import { useLeftStore as LeftStore } from "../../../../../levels/utils/left/utils";
import { useWheelStore as WheelStore } from "../../../../../wheel/utils";

let animation;
let initShown;
let putShow = () => {};
let initMounted;
let putMount = () => {};
let initView;
let putView = () => {};

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

function onDrag(_, { point: { x } }) {
  const { ref: appRef } = GStore();
  const value = (x / appRef.current.clientWidth) * 100;
  const { putMount: mountLevel1Panel } = Level1PanelStore();
  const { putShow: showTitle } = TitleStore();

  if (value >= 60) {
    mountLevel1Panel(true);
    showTitle(false);
  }
}
function onDragEnd(_, { point: { x } }) {
  const { ref: appRef } = GStore();
  const value = (x / appRef.current.clientWidth) * 100;
  const { animation: level1AnimationPanel } = Level1PanelStore();
  const { putShow: showTitle, putName } = TitleStore();
  const { putMount: mountRight } = RightStore();
  const { putShow: showLeft } = LeftStore();

  if (value > 80) {
    animation.start("right");
    setTimeout(() => {
      putName("Level 1");
      showTitle(true);
    }, 400);
    putShow(false);
    showLeft(false);
    mountRight(true);
    level1AnimationPanel.start("current");
  } else {
    putName("Level 2");
    showTitle(true);
  }
}
function onTransitionEnd() {
  const { initName } = TitleStore();
  if (initShown) {
    return;
  }

  const { initShown: isLevelsShown } = LevelsStore();
  if (!isLevelsShown) {
    const { putView: viewLevel } = GStore();
    viewLevel((old) =>
      old === "home" ? String(initName).toLowerCase().split(" ").join("") : old
    );
  } else {
    putMount(false);
  }
}
function useRender() {
  animation = useAnimation();
  const { usePanel: Panel } = useViewsStore();

  return (
    initMounted && (
      <Panel
        swatch1={swatch1}
        swatch2={swatch2}
        locked
        left={initView ? "200%" : "100%"}
        isShown={initShown}
        onTransitionEnd={onTransitionEnd}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        animation={animation}
      />
    )
  );
}
function onGameStart() {}

export function useStore() {
  useEffect(() => {
    const { putName, putShow: showTitle } = TitleStore();
    putName("Level 1");
    showTitle(true);
  }, []);
  const { unmount } = GStore();

  const [inView, setView] = useState(false);
  initView = inView;
  putView = setView;
  useEffect(() => () => putView(false), []);
  useEffect(() => {
    initView = inView;
  }, [inView]);

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
  useEffect(() => unmount({ set: mount, value: false }), [unmount]);
  useEffect(() => {
    initMounted = isMounted;
  }, [isMounted]);

  useEffect(() => {
    if (!isShown) {
      return;
    }
    const { putProps } = WheelStore();
    putProps((old) => ({
      ...old,
      onGameStart,
    }));
  }, [isShown]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    putShow(true);
  }, [isMounted]);

  return {
    Render: useRender,
  };
}
export function usePanelStore() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    initView,
    putView,
    animation,
  };
}

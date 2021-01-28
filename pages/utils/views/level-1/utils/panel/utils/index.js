import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useGStore as GStore } from "../../../../..";
import { useViewsStore } from "../../../../utils";
import styles from "./style.module.scss";
import { usePanelStore as Level2PanelStore } from "../../../../level-2/utils/panel/utils";
import { useTitleStore as TitleStore } from "../../../../../header/utils/title/utils";
import { useLevelsStore as LevelsStore } from "../../../../../levels/utils";
import { useRightStore as RightStore } from "../../../../../levels/utils/right/utils";
import { useLeftStore as LeftStore } from "../../../../../levels/utils/left/utils";
import { usePracticeStore as PracticeStore } from "../../../../../levels/utils/practice/utils";
import { usePauseStore as PauseStore } from "../../../../../footer/utils/pause/utils";
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
const guide = { number: 11, time: "20 seconds" };

function onDrag(_, { point: { x } }) {
  const { ref: appRef } = GStore();
  const value = (x / appRef.current.clientWidth) * 100;
  const { putMount: mountLevel2Panel } = Level2PanelStore();
  const { putShow: showTitle } = TitleStore();
  const { putShow: showRight, putView: viewRight } = RightStore();

  if (value <= 40) {
    mountLevel2Panel(true);
    showTitle(false);
  } else if (value >= 60) {
    showTitle(false);
    viewRight(true);
    showRight(false);
  }
}
function onDragEnd(_, { point: { x } }) {
  const { ref: appRef } = GStore();
  const value = (x / appRef.current.clientWidth) * 100;
  const {
    animation: level2AnimationPanel,
    putView: viewLevel2Panel,
    putMount: mountLevel2Panel,
  } = Level2PanelStore();
  const { putShow: showTitle, putName } = TitleStore();
  const { putShow: showRight, putView: viewRight } = RightStore();
  const { putMount: mountLeft } = LeftStore();
  const { putMount: mountPractice, putShow: showPractice } = PracticeStore();

  if (value < 20) {
    animation.start("left");
    setTimeout(() => {
      putName("Level 2");
      showTitle(true);
    }, 400);
    putShow(false);
    putView(false);
    viewRight(false);
    showRight(false);
    mountLeft(true);
    level2AnimationPanel.start("current");
    showPractice(false);
  } else if (value > 80) {
    setTimeout(() => {
      putName("Practice");
      showTitle(true);
    }, 400);
    animation.start("right");
    viewLevel2Panel(true);
    mountPractice(true);
  } else {
    setTimeout(() => {
      putName("Level 1");
      showTitle(true);
    }, 400);
    animation.start("current");
    showRight(true);
    viewLevel2Panel(false);
    mountLevel2Panel(false);
    showPractice(false);
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
        left={!initView && "-100%"}
        isShown={initShown}
        swatch1={swatch1}
        swatch2={swatch2}
        difficulty="Hard"
        movement="Free"
        guide={guide}
        onTransitionEnd={onTransitionEnd}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        animation={animation}
      />
    )
  );
}
function onGameStart() {
  const { initView: isView } = GStore();
  const { putShow: showTitle, initName } = TitleStore();

  if (isView === "home" && initName.includes("1")) {
    const { putShow: showRight } = RightStore();
    const { putShow: showLeft } = LeftStore();
    const { putMount: mountPause } = PauseStore();
    const { putShow: showLevel2Panel } = Level2PanelStore();
    const { putShow: showLevels } = LevelsStore();

    showLevels(false);
    mountPause(true);
    showTitle(false);
    showLeft(false);
    showRight(false);
    putShow(false);
    showLevel2Panel(false);
  }
}

export function useStore() {
  useEffect(() => {
    const { putName, putShow: showTitle } = TitleStore();
    putName("Level 1");
    showTitle(true);
  }, []);
  const { unmount } = GStore();

  const [inView, setView] = useState(true);
  initView = inView;
  putView = setView;
  useEffect(() => () => putView(true), []);
  useEffect(() => {
    initView = inView;
  }, [inView]);

  const [isShown, show] = useState(false);
  initShown = isShown;
  putShow = show;
  useEffect(() => unmount({ set: show, value: false }), [unmount]);
  useEffect(() => {
    initShown = isShown;
  }, [isShown]);

  const [isMounted, mount] = useState(true);
  initMounted = isMounted;
  putMount = mount;
  useEffect(() => unmount({ set: mount, value: true }), [unmount]);
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

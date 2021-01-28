import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useGStore } from "../../../..";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { usePanelStore as Level2PanelStore } from "../../../../views/level-2/utils/panel/utils";
import { usePanelStore as Level1PanelStore } from "../../../../views/level-1/utils/panel/utils";
import { useLeftStore as LeftStore } from "../../left/utils";
import { usePracticeStore as PracticeStore } from "../../practice/utils";

let initShown;
let putShow = () => {};
let initMounted;
let putMount = () => {};
let initView;
let putView = () => {};
let className;

const { right, show: showRight } = styles;

function onTransitionEnd() {
  if (initShown) {
    return;
  }
  if (!initView) {
    putMount(false);
  }
}
function useRender() {
  return (
    initMounted && (
      <main
        aria-hidden="true"
        className={className}
        onClick={() => {
          const { putShow: showTitle, putName } = TitleStore();
          showTitle(false);
          setTimeout(() => {
            putName("Level 2");
            showTitle(true);
          }, 400);

          const {
            animation: level1PanelAnimation,
            putShow: showLevel1Panel,
            putView: viewLevel1Panel,
          } = Level1PanelStore();
          level1PanelAnimation.start("left");
          showLevel1Panel(false);
          viewLevel1Panel(false);

          putView(false);
          putShow(false);

          const { putMount: mountLeft } = LeftStore();
          mountLeft(true);

          const { putShow: showPractice } = PracticeStore();
          showPractice(false);

          const {
            animation: level2PanelAnimation,
            putMount: mountLevel2Panel,
          } = Level2PanelStore();
          mountLevel2Panel(true);
          setTimeout(() => level2PanelAnimation.start("current"), 200);
        }}
        onTransitionEnd={onTransitionEnd}
      />
    )
  );
}
export function useStore() {
  const { unmount } = useGStore();

  const [inView, setView] = useState(true);
  initView = inView;
  putView = setView;
  useEffect(() => putView(true), []);
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

  className = useMemo(() => `${right} ${isShown && showRight}`, [isShown]);

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
export function useRightStore() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    initView,
    putView,
  };
}

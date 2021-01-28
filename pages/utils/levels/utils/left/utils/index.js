import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useGStore } from "../../../..";
import { usePanelStore as Level2PanelStore } from "../../../../views/level-2/utils/panel/utils";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { useRightStore as RightStore } from "../../right/utils";
import { usePanelStore as Level1PanelStore } from "../../../../views/level-1/utils/panel/utils";

let initShown;
let putShow = () => {};
let initMounted;
let putMount = () => {};
let className;

const { left, show: showLeft } = styles;

function onTransitionEnd() {
  if (initShown) {
    return;
  }
  putMount(false);
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
            putName("Level 1");
            showTitle(true);
          }, 400);

          const {
            animation: level2PanelAnimation,
            putShow: showLevel2Panel,
          } = Level2PanelStore();
          level2PanelAnimation.start("right");
          showLevel2Panel(false);

          putShow(false);

          const { putMount: mountRight } = RightStore();
          mountRight(true);

          const {
            animation: level1PanelAnimation,
            putMount: mountLevel1Panel,
          } = Level1PanelStore();
          mountLevel1Panel(true);
          setTimeout(() => level1PanelAnimation.start("current"), 200);
        }}
        onTransitionEnd={onTransitionEnd}
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

  className = useMemo(() => `${left} ${isShown && showLeft}`, [isShown]);

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
export function useLeftStore() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
  };
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useGStore } from "../../../..";
import { useSVGs } from "../../../../../../public/svgs";
import styles from "./style.module.scss";

let initMounted;
let putMount;
let initShown;
let putShow;
let className;

const { settings, show: showSettings } = styles;

export function useRender() {
  const { useSettingsIcon: Settings } = useSVGs();

  return (
    initMounted && (
      <main className={className}>
        <Settings />
      </main>
    )
  );
}

export function updateMounted({ isMounted, mount }) {
  initMounted = isMounted;
  if (mount) {
    putMount = mount;
  }
}
export function updateShown({ isShown, show }) {
  initShown = isShown;
  if (show) {
    putShow = show;
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

  const [isMounted, mount] = useState(false);
  updateMounted({ isMounted, mount });
  useEffect(unmount.bind(null, { set: putMount, value: false }), [unmount]);
  useEffect(updateMounted.bind(null, { isMounted }), [isMounted]);

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(unmount.bind(null, { set: putShow, value: false }), [unmount]);
  useEffect(updateShown.bind(null, { isShown }), [isShown]);

  useEffect(checkMounted, [isMounted]);

  className = useMemo(() => `${settings} ${isShown && showSettings}`, [
    isShown,
  ]);

  return { Render: useRender };
}
export function useSettingsStore() {
  return {
    initMounted,
    putMount,
    initShown,
    putShow,
  };
}

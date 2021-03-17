import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useProps as useAppProps } from "../../../../..";
import { useProps as useContentsProps } from "./contents/utils";

let initMounted;
let putMount;

export const useContents = dynamic(() =>
  import("./contents").then((mod) => mod.useContents)
);

function updateMounted({ isMounted, mount }) {
  if (initMounted !== isMounted) {
    initMounted = isMounted;
  }
  if (mount && putMount !== mount) {
    putMount = mount;
  }
}

export function useStore() {
  const { unmount } = useAppProps();

  const [isMounted, mount] = useState(false);
  updateMounted({ isMounted, mount });
  useEffect(() => unmount({ set: mount }), [unmount]);
  useEffect(() => updateMounted({ isMounted }), [isMounted]);

  return {
    isMounted,
    Contents: useContents,
  };
}
export function useProps() {
  const {
    initShown,
    putShow,
    initPaused,
    putPause,
    onClick,
  } = useContentsProps();

  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    initPaused,
    putPause,
    onClick,
  };
}

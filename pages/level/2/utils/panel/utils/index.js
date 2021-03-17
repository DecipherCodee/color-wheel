import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAnimation } from "framer-motion";
import { useProps as appProps } from "../../../../../utils";

let animation;
let initViewed;
let putView;
let initMounted;
let putMount;

export const useContents = dynamic(() =>
  import("./contents").then((mod) => mod.useContents)
);

function updateView({ isViewed, view }) {
  if (initViewed !== isViewed) {
    initViewed = isViewed;
  }
  if (view && putView !== view) {
    putView = view;
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

export function useStore() {
  const { unmount } = appProps();

  const [isViewed, view] = useState(false);
  updateView({ isViewed, view });
  useEffect(() => unmount({ set: putView }), [unmount]);
  useEffect(() => updateView({ isViewed }), [isViewed]);

  const [isMounted, mount] = useState(false);
  updateMounted({ isMounted, mount });
  useEffect(() => unmount({ set: putMount }), [unmount]);
  useEffect(() => updateMounted({ isMounted }), [isMounted]);

  animation = useAnimation();

  return {
    Contents: useContents,
    isMounted,
  };
}
export function useProps() {
  return {
    animation,
    initViewed,
    putView,
    initMounted,
    putMount,
  };
}

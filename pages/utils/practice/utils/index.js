import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useProps as useAppProps } from "../..";

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

  return { Contents: useContents, isMounted };
}
export function useProps() {
  return {
    initMounted,
    putMount,
  };
}

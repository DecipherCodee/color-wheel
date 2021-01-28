import dynamic from "next/dynamic";

const useColor = dynamic(() => import("./color").then((mod) => mod.useColor));
const usePanel = dynamic(() => import("./panel").then((mod) => mod.usePanel));

export function useViewsStore() {
  return {
    usePanel,
    useColor,
  };
}

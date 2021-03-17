import dynamic from "next/dynamic";

const usePanel = dynamic(() => import("./panel").then((mod) => mod.usePanel));

export function useLevel() {
  return { usePanel };
}

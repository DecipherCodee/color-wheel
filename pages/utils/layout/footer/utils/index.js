import dynamic from "next/dynamic";
import { useSVGs } from "../../../svgs";
import { footer } from "./style.module.scss";

export const usePause = dynamic(() =>
  import("./pause").then((mod) => mod.usePause)
);

export function useStore() {
  const { useDecipherCodeLogo } = useSVGs();

  return {
    Pause: usePause,
    footer,
    DecipherCodeLogo: useDecipherCodeLogo,
  };
}

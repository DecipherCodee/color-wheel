import { useSVGs } from "../../../../public/svgs";
import { usePause } from "./pause";
import { useSettings } from "./settings";
import styles from "./style.module.scss";

const { footer } = styles;

export function useStore() {
  const { useDecipherCodeLogo } = useSVGs();

  return {
    Pause: usePause,
    footer,
    Settings: useSettings,
    DecipherCodeLogo: useDecipherCodeLogo,
  };
}

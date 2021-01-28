import { useSVGs } from "../../../../public/svgs";
import { usePause } from "./pause";
import styles from "./style.module.scss";

const { footer, settings } = styles;

export function useStore() {
  const { useSettingsIcon, useDecipherCodeLogo } = useSVGs();

  return {
    Pause: usePause,
    footer,
    settings,
    Settings: useSettingsIcon,
    DecipherCodeLogo: useDecipherCodeLogo,
  };
}

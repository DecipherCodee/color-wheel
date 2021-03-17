import dynamic from "next/dynamic";

const useSettingsIcon = dynamic(() =>
  import("./settings-icon").then((mod) => mod.useSettiingsIcon)
);
const useDecipherCodeLogo = dynamic(() =>
  import("./DecipherCode-logo").then((mod) => mod.useDecipherCodeLogo)
);
const useColorWheelLogo = dynamic(() =>
  import("./ColorWheel-logo").then((mod) => mod.useColorWheelLogo)
);
const useSwatchIcon = dynamic(() =>
  import("./swatches-icon").then((mod) => mod.useSwatchIcon)
);
const useLevelIcon = dynamic(() =>
  import("./level-icon").then((mod) => mod.useLevelIcon)
);
const useHeaderIcon = dynamic(() =>
  import("./header-icon").then((mod) => mod.useHeaderIcon)
);
const useSubHeaderIcon = dynamic(() =>
  import("./header-icon/utils/subheader-icon").then(
    (mod) => mod.useSubHeaderIcon
  )
);

export function useSVGs() {
  return {
    useSubHeaderIcon,
    useHeaderIcon,
    useSettingsIcon,
    useDecipherCodeLogo,
    useColorWheelLogo,
    useSwatchIcon,
    useLevelIcon,
  };
}

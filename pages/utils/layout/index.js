import dynamic from "next/dynamic";

const useHeader = dynamic(() =>
  import("./header").then((mod) => mod.useHeader)
);
const useFooter = dynamic(() =>
  import("./footer").then((mod) => mod.useFooter)
);

export function useLayout() {
  return {
    useHeader,
    useFooter,
  };
}

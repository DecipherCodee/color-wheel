import { useStore } from "./utils";

export function usePractice() {
  const { colors, isMounted, className, Render } = useStore();

  return <Render className={className} colors={colors} isMounted={isMounted} />;
}

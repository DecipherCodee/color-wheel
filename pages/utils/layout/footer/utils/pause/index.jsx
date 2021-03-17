import { useStore } from "./utils";

export function usePause() {
  const { isMounted, Contents } = useStore();

  return isMounted && <Contents />;
}

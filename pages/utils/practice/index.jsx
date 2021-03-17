import { useStore } from "./utils";

export function usePractice() {
  const { Contents, isMounted } = useStore();

  return isMounted && <Contents />;
}

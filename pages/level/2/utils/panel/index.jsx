import { useStore } from "./utils";

export function usePanel() {
  const { Contents, isMounted } = useStore();

  return isMounted && <Contents />;
}

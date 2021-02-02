import { useStore } from "./utils";

export function usePause() {
  const { Render } = useStore();

  return <Render />;
}

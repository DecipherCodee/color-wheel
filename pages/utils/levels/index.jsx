import { useStore } from "./utils";

export function useLevels() {
  const { Render } = useStore();

  return <Render />;
}

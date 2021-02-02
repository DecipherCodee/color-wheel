import { useStore } from "./utils";

export function useSettings() {
  const { Render } = useStore();

  return <Render />;
}

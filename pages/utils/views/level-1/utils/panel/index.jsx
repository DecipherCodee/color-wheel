import { useStore } from "./utils";

export function usePanel() {
  const { Render } = useStore();

  return <Render />;
}

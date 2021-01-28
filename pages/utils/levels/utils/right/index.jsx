import { useStore } from "./utils";

export function useRight() {
  const { Render } = useStore();

  return <Render />;
}

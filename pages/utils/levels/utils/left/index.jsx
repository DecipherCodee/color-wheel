import { useStore } from "./utils";

export function useLeft() {
  const { Render } = useStore();

  return <Render />;
}

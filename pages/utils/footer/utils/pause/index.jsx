import { useStore } from "./utils";

export function usePause() {
  const { Render, className, isMounted } = useStore();

  return <Render className={className} isMounted={isMounted} />;
}

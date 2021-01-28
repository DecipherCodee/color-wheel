import { useStore } from "./utils";

export function useLevel1() {
  const { Render, className, isMounted } = useStore();

  return <Render className={className} isMounted={isMounted} />;
}

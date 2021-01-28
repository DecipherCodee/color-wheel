import { useStore } from "./utils";

export function useC() {
  const { c } = useStore();

  return <main className={c} />;
}

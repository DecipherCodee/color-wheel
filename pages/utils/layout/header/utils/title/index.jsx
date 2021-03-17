import { useStore } from "./utils";

export function useTitle() {
  const { className, name } = useStore();

  return <main className={className}>{name}</main>;
}

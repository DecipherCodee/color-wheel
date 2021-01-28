import { useStore } from "./utils";

export function useTitle() {
  const { className, name, onTransitionEnd } = useStore();

  return (
    <main className={className} onTransitionEnd={onTransitionEnd}>
      {name}
    </main>
  );
}

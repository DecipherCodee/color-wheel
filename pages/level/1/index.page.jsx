import { useStore } from "./utils";

export function use1() {
  const { className, Colors, onTransitionEnd, onClick } = useStore();

  return (
    <main
      aria-hidden="true"
      className={className}
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
    >
      <Colors />
    </main>
  );
}
export default use1;

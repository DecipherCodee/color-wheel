import { useStore } from "./utils";

export function useContents() {
  const { onClick, className, onAnimationEnd } = useStore();

  return (
    <main
      aria-hidden="true"
      className={className}
      onClick={onClick}
      onAnimationEnd={onAnimationEnd}
    />
  );
}

import { useStore } from "./utils";

export function useLeft() {
  const { onClick, isMounted, className } = useStore();

  return (
    isMounted && (
      <main aria-hidden="true" className={className} onClick={onClick} />
    )
  );
}

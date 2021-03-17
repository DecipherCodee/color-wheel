import { useStore } from "./utils";

export function useContents() {
  const {
    Panel,
    isShown,
    swatch1,
    swatch2,
    left,
    animation,
    onAnimationEnd,
    onDrag,
    onDragEnd,
  } = useStore();

  return (
    <Panel
      onAnimationEnd={onAnimationEnd}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      isShown={isShown}
      swatches={{ swatch1, swatch2 }}
      animation={animation}
      left={left}
    />
  );
}
